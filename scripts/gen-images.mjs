// Generates simple SVG plant thumbnails (public/img) and the landing background (src/assets/bg.svg).
import { writeFileSync } from 'node:fs';

const wrap = (bg, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="${bg}"/>${body}</svg>`;
const pot = (c = '#b5653a') =>
  `<path d="M95 220h110l-14 62h-82z" fill="${c}"/><rect x="88" y="208" width="124" height="18" rx="5" fill="${c}" opacity=".85"/>`;
const leaf = (x, y, rot, len, w, c) =>
  `<ellipse cx="0" cy="${-len / 2}" rx="${w}" ry="${len / 2}" fill="${c}" transform="translate(${x} ${y}) rotate(${rot})"/>`;
const fan = (n, spread, len, w, c, x = 150, y = 212) =>
  Array.from({ length: n }, (_, i) => leaf(x, y, -spread + (2 * spread * i) / (n - 1), len, w, c)).join('');

const plants = {
  'snake-plant': ['#e6f2e3', pot() + fan(5, 22, 150, 16, '#2f7d4a') + fan(3, 12, 120, 12, '#5aa86a')],
  'spider-plant': ['#e9f3e0', pot('#c9a27a') + fan(9, 70, 110, 7, '#6cb36b') + fan(7, 55, 90, 6, '#a6d487')],
  'peace-lily': ['#e7f1ee', pot('#8aa6b8') + fan(6, 45, 110, 20, '#2b7a55') +
    `<ellipse cx="150" cy="95" rx="20" ry="38" fill="#fff"/><rect x="147" y="95" width="6" height="28" fill="#f4d35e"/>`],
  'boston-fern': ['#e4f1e0', pot() + fan(13, 80, 120, 9, '#3c9a4a') + fan(9, 60, 100, 8, '#63b868')],
  'rubber-plant': ['#e8f0e6', pot('#7f8f9c') + `<rect x="145" y="80" width="10" height="135" fill="#6b4a2f"/>` +
    leaf(150, 100, -50, 70, 24, '#1f6a3c') + leaf(150, 130, 55, 70, 24, '#2a8049') + leaf(150, 160, -55, 70, 24, '#1f6a3c') + leaf(150, 90, 8, 70, 24, '#2a8049')],
  'areca-palm': ['#e5f2ea', pot('#a9774f') + fan(11, 75, 160, 8, '#3a9a52') + fan(7, 50, 135, 7, '#6cbf6b')],
  lavender: ['#efe9f7', pot('#d9c3a5') + [-40, -20, 0, 20, 40].map((a) =>
    `<g transform="translate(150 212) rotate(${a})"><rect x="-2" y="-150" width="4" height="150" fill="#5f8f4e"/><ellipse cx="0" cy="-160" rx="9" ry="28" fill="#8e6bbf"/><ellipse cx="0" cy="-135" rx="8" ry="16" fill="#a687d1"/></g>`).join('')],
  jasmine: ['#f8f3ea', pot('#c47a5a') + fan(7, 55, 100, 10, '#4a9a55') +
    [[110, 100], [190, 110], [150, 70], [125, 140], [180, 150]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" fill="#fff"/><circle cx="${x}" cy="${y}" r="4" fill="#f4d35e"/>`).join('')],
  rosemary: ['#e6efe4', pot('#8c6b4f') + [-35, -18, 0, 18, 35].map((a) =>
    `<g transform="translate(150 212) rotate(${a})"><rect x="-2" y="-140" width="4" height="140" fill="#58763f"/>${Array.from({ length: 9 }, (_, i) => `<rect x="-10" y="${-130 + i * 14}" width="20" height="4" rx="2" fill="#4f8a4b"/>`).join('')}</g>`).join('')],
  mint: ['#e3f3e6', pot('#9a5f3c') + fan(8, 65, 85, 22, '#43b05a') + fan(5, 35, 105, 22, '#2e9a49')],
  'lemon-balm': ['#f1f4dc', pot('#ba8a5a') + fan(8, 65, 85, 21, '#9cc94d') + fan(5, 35, 105, 20, '#78b043')],
  basil: ['#e5f1e0', pot('#a5522f') + fan(8, 60, 90, 24, '#2f8f3f') + fan(4, 30, 110, 22, '#47ad52')],
  'aloe-vera': ['#e7f3ec', pot('#c47a5a') + [-60, -35, -12, 12, 35, 60].map((a) =>
    `<path d="M0 0 C-20 -50 -12 -110 0 -140 C12 -110 20 -50 0 0Z" fill="#5aa07a" transform="translate(150 212) rotate(${a})"/>`).join('')],
  'jade-plant': ['#e9f2e6', pot('#7d8c97') + `<path d="M145 215 L140 130 L100 90 M142 150 L190 100" stroke="#6b4a2f" stroke-width="9" fill="none" stroke-linecap="round"/>` +
    [[100, 85], [75, 105], [125, 80], [190, 95], [215, 115], [165, 85], [140, 70]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="22" ry="15" fill="#3f9455"/>`).join('')],
  echeveria: ['#f6eaf0', pot('#c9a27a') + [0, 1, 2].map((r) => Array.from({ length: 8 - r * 2 }, (_, i) =>
    `<ellipse cx="0" cy="-${46 - r * 14}" rx="${17 - r * 3}" ry="${34 - r * 8}" fill="${['#8fb9a3', '#a7cbb6', '#c5a0c0'][r]}" transform="translate(150 190) rotate(${(360 / (8 - r * 2)) * i + r * 20})"/>`).join('')).join('')],
  haworthia: ['#e8f0e9', pot('#6f7f8a') + [0, 1].map((r) => Array.from({ length: 7 - r * 2 }, (_, i) =>
    `<path d="M0 0 C-12 -30 -8 -70 0 -90 C8 -70 12 -30 0 0Z" fill="${r ? '#4d8a5e' : '#2f6b45'}" transform="translate(150 205) rotate(${-70 + (140 / (6 - r * 2)) * i})"/><rect x="-1" y="0" width="0" height="0"/>`).join('')).join('') +
    `<g stroke="#fff" stroke-width="2" opacity=".7"><line x1="140" y1="150" x2="160" y2="150"/><line x1="138" y1="170" x2="162" y2="170"/><line x1="142" y1="130" x2="158" y2="130"/></g>`],
  'barrel-cactus': ['#f7efdd', pot('#c47a5a') + `<ellipse cx="150" cy="150" rx="62" ry="68" fill="#3f8f55"/>` +
    [-40, -20, 0, 20, 40].map((x) => `<path d="M${150 + x} 85 Q${150 + x * 1.4} 150 ${150 + x} 215" stroke="#2c6d40" stroke-width="3" fill="none"/>`).join('') +
    `<circle cx="150" cy="82" r="9" fill="#f4c542"/>`],
  'bunny-ears': ['#f6f0e4', pot('#b5653a') + `<ellipse cx="120" cy="140" rx="34" ry="62" fill="#5aa863" transform="rotate(-12 120 140)"/><ellipse cx="185" cy="120" rx="32" ry="58" fill="#6fba70" transform="rotate(14 185 120)"/>` +
    [[110, 120], [130, 160], [175, 100], [195, 140], [120, 80], [185, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#fff"/>`).join('')],
};

for (const [name, [bg, body]] of Object.entries(plants)) {
  writeFileSync(`public/img/${name}.svg`, wrap(bg, body));
}

// Landing background: layered greens with large leaves.
const bgLeaves = Array.from({ length: 22 }, (_, i) => {
  const x = (i * 197) % 1600, y = (i * 131) % 900, r = (i * 47) % 360, s = 120 + ((i * 53) % 160);
  const c = ['#2f7d4a', '#3f9d4b', '#1f5a3a', '#59b36a'][i % 4];
  return `<ellipse cx="0" cy="${-s / 2}" rx="${s / 3}" ry="${s / 2}" fill="${c}" opacity=".55" transform="translate(${x} ${y}) rotate(${r})"/>`;
}).join('');
writeFileSync('src/assets/bg.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b4d2e"/><stop offset="1" stop-color="#4aa564"/></linearGradient></defs><rect width="1600" height="900" fill="url(#g)"/>${bgLeaves}</svg>`);
console.log('images generated');
