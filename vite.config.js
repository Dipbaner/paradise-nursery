import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the built site load its assets from the GitHub Pages sub-path.
export default defineConfig({
  plugins: [react()],
  base: './',
});
