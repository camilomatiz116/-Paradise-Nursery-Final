import React, { useMemo } from 'react';
import './CartItem.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

/**
 * CartItem Component
 * Manages the shopping cart display, allowing users to update quantities, remove items, 
 * and see total costs.
 * 
 * @param {Object} props
 * @param {Function} props.onContinueShopping - Callback to navigate back to the product catalog
 */
const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  /**
   * Helper to parse price string (e.g., "$15") into a number.
   * @param {string} costStr - Price string starting with '$'
   */
  const parsePrice = (costStr) => parseFloat(costStr.replace('$', '')) || 0;

  /**
   * Calculate total amount for all items in the cart.
   * Memoized to optimize performance as the user interacts with the cart.
   */
  const totalAmount = useMemo(() => {
    return cart.reduce((total, item) => total + parsePrice(item.cost) * item.quantity, 0).toFixed(2);
  }, [cart]);

  /**
   * Calculate subtotal for a specific item.
   * @param {Object} item - Cart item object
   */
  const calculateTotalCost = (item) => {
    return (parsePrice(item.cost) * item.quantity).toFixed(2);
  };

  /**
   * Handlers for cart interactions
   */
  const handleContinueShopping = (e) => {
    if (e) e.preventDefault();
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart Summary</h2>
        <div className="cart-summary-group">
          <div className="total-items-summary">
            Total Items: <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
          <div className="total-amount-summary">
            Total Cost: <span>${totalAmount}</span>
          </div>
        </div>
      </div>
      
      <div className="cart-items-list">
        {cart.length === 0 ? (
          <div className="empty-cart-message">
            <p>Your sanctuary is empty. Let's find some greenery!</p>
            <button className="secondary-btn" onClick={handleContinueShopping}>
              Browse Plants
            </button>
          </div>
        ) : (
          cart.map(item => (
            <div className="cart-item-card" key={item.name}>
              <div className="cart-item-image-wrapper">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-info">
                <div className="cart-item-main">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-unit-price">Unit Price: {item.cost}</p>
                </div>
                
                <div className="cart-item-controls">
                  <div className="quantity-selector">
                    <button className="qty-btn" onClick={() => handleDecrement(item)} aria-label="Decrease quantity">-</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => handleIncrement(item)} aria-label="Increase quantity">+</button>
                  </div>
                  <div className="item-subtotal">
                    Subtotal: ${calculateTotalCost(item)}
                  </div>
                </div>

                <button className="remove-item-btn" onClick={() => handleRemove(item)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-footer">
          <button className="secondary-btn" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
          <button className="primary-btn" onClick={() => alert('Próximamente')}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartItem;
