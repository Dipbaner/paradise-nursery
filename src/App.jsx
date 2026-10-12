import React, { useState } from 'react';
import ProductList from './ProductList.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  if (showProductList) {
    return <ProductList onHomeClick={() => setShowProductList(false)} />;
  }

  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <div className="landing-content">
          <h1 className="landing-title">Paradise Nursery</h1>
          <p className="landing-tagline">Where Green Meets Serenity</p>
          <AboutUs />
          <button className="get-started-button" onClick={() => setShowProductList(true)}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
