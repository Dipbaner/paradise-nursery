# Paradise Nursery

Paradise Nursery is the front end of an online houseplant shop built with
**React 18**, **Redux Toolkit** and **Vite**. Visitors land on a welcome page,
browse 18 houseplants in three categories, add them to a shopping cart and
review or adjust the cart before checkout.

## Features
- Landing page with background image, company description and a Get Started button
- Product listing: 3 categories x 6 plants, each with thumbnail, name, description and price
- Add to Cart (button disables once the plant is in the cart)
- Navbar with Home / Plants / Cart links and a live cart counter
- Cart page with total amount, total plants, per-plant subtotal, + / - controls, Delete,
  Continue Shopping and a Checkout "Coming Soon" message
- Global cart state managed in a Redux Toolkit slice

## Run locally
```bash
npm install
npm run dev
```

## Build and deploy to GitHub Pages
```bash
npm run build
npm run deploy      # publishes dist/ to the gh-pages branch
```
Then enable **Settings > Pages > gh-pages branch** in the repository.
