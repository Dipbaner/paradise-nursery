import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';
import './App.css';

// Thumbnails live in public/img; BASE_URL keeps paths valid on GitHub Pages.
const img = (file) => `${import.meta.env.BASE_URL}img/${file}.svg`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('snake-plant'), cost: 15,
        description: 'Produces oxygen at night and filters indoor toxins. Nearly indestructible.' },
      { name: 'Spider Plant', image: img('spider-plant'), cost: 12,
        description: 'Fast-growing and pet friendly, it removes formaldehyde and xylene from the air.' },
      { name: 'Peace Lily', image: img('peace-lily'), cost: 18,
        description: 'Elegant white blooms and excellent at removing mold spores and ammonia.' },
      { name: 'Boston Fern', image: img('boston-fern'), cost: 20,
        description: 'Lush, feathery fronds that add humidity and naturally purify the air.' },
      { name: 'Rubber Plant', image: img('rubber-plant'), cost: 17,
        description: 'Bold, glossy leaves that absorb airborne chemicals and thrive in low light.' },
      { name: 'Areca Palm', image: img('areca-palm'), cost: 25,
        description: 'A tropical palm that humidifies and freshens the air in living rooms.' },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: img('lavender'), cost: 20,
        description: 'Calming purple blooms with a soothing scent that helps you relax and sleep.' },
      { name: 'Jasmine', image: img('jasmine'), cost: 18,
        description: 'Sweet, romantic fragrance from delicate white star-shaped flowers.' },
      { name: 'Rosemary', image: img('rosemary'), cost: 15,
        description: 'A woody, fragrant herb that is perfect for cooking and aromatherapy.' },
      { name: 'Mint', image: img('mint'), cost: 12,
        description: 'Fresh, cooling aroma; great for teas, drinks and repelling insects.' },
      { name: 'Lemon Balm', image: img('lemon-balm'), cost: 14,
        description: 'Citrus-scented leaves that relieve stress and attract pollinators.' },
      { name: 'Basil', image: img('basil'), cost: 10,
        description: 'Sweet, peppery leaves for the kitchen with a wonderful warm scent.' },
    ],
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      { name: 'Aloe Vera', image: img('aloe-vera'), cost: 14,
        description: 'Soothing gel for minor burns and skin; very easy to care for.' },
      { name: 'Jade Plant', image: img('jade-plant'), cost: 16,
        description: 'Thick glossy leaves said to bring good luck and prosperity.' },
      { name: 'Echeveria', image: img('echeveria'), cost: 11,
        description: 'Rose-shaped rosettes in soft pastel shades; a tabletop favourite.' },
      { name: 'Haworthia', image: img('haworthia'), cost: 13,
        description: 'Compact, striped succulent that does well in bright indirect light.' },
      { name: 'Barrel Cactus', image: img('barrel-cactus'), cost: 19,
        description: 'Round, ribbed cactus with golden spines; needs very little water.' },
      { name: 'Bunny Ears Cactus', image: img('bunny-ears'), cost: 17,
        description: 'Fuzzy pads shaped like bunny ears, a cute addition to any desk.' },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // A plant counts as "added" only while it is in the cart, so removing it
  // from the cart automatically re-enables its Add to Cart button.
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const goHome = (e) => {
    e.preventDefault();
    setShowCart(false);
    onHomeClick();
  };
  const goPlants = (e) => {
    e.preventDefault();
    setShowCart(false);
  };
  const goCart = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  return (
    <div className="product-page">
      <nav className="navbar">
        <a href="#home" className="navbar-brand" onClick={goHome}>
          <span className="brand-logo" aria-hidden="true">🌿</span>
          <span>
            <span className="brand-name">Paradise Nursery</span>
            <span className="brand-sub">Where Green Meets Serenity</span>
          </span>
        </a>
        <div className="navbar-links">
          <a href="#home" onClick={goHome}>Home</a>
          <a href="#plants" onClick={goPlants}>Plants</a>
          <a href="#cart" onClick={goCart}>Cart</a>
          <a href="#cart" className="cart-icon" onClick={goCart} aria-label="Shopping cart">
            <svg viewBox="0 0 256 256" width="34" height="34" aria-hidden="true">
              <rect width="256" height="256" fill="none" />
              <circle cx="80" cy="216" r="12" fill="#fff" />
              <circle cx="184" cy="216" r="12" fill="#fff" />
              <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            </svg>
            <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <main className="product-grid-wrapper">
          {plantsArray.map((group) => (
            <section key={group.category} className="category-section">
              <h2 className="category-title">{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => {
                  const added = isInCart(plant.name);
                  return (
                    <div className="product-card" key={plant.name}>
                      <img className="product-image" src={plant.image} alt={plant.name} />
                      <h3 className="product-title">{plant.name}</h3>
                      <p className="product-description">{plant.description}</p>
                      <p className="product-price">${plant.cost}</p>
                      <button
                        className={`product-button ${added ? 'added' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={added}
                      >
                        {added ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      )}
    </div>
  );
}

export default ProductList;
