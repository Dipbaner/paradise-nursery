import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import './App.css';

function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [checkoutMsg, setCheckoutMsg] = useState('');

  const calculateTotalCost = (item) => item.cost * item.quantity;
  const calculateTotalAmount = () =>
    cart.reduce((sum, item) => sum + calculateTotalCost(item), 0);
  const totalPlants = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleDelete = (item) => dispatch(removeItem(item.name));

  const handleCheckout = () => setCheckoutMsg('Checkout is Coming Soon!');

  return (
    <div className="cart-page">
      <h2 className="cart-total">Total Cart Amount: ${calculateTotalAmount()}</h2>
      <p className="cart-plant-count">Total Plants: {totalPlants}</p>

      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty. Add some plants to brighten your home!</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Unit price: ${item.cost}</div>
                <div className="cart-item-quantity">
                  <button className="qty-button" onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name}`}>
                    -
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button className="qty-button" onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name}`}>
                    +
                  </button>
                </div>
                <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              </div>
              <button className="cart-item-delete" onClick={() => handleDelete(item)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-actions">
        <button className="get-started-button" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="get-started-button checkout" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
      {checkoutMsg && <p className="checkout-msg">{checkoutMsg}</p>}
    </div>
  );
}

export default CartItem;
