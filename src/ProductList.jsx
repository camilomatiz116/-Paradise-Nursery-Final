import React, { useState, useMemo, useCallback } from 'react';
import './ProductList.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import PlantCard from './PlantCard';
import { plantCategories } from './plantsData';

/**
 * ProductList Component
 * Manages the main plant catalog view, navbar navigation, and cart integration.
 * 
 * @param {Object} props
 * @param {Function} props.onHomeClick - Callback to return to the landing page
 */
function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    
    // Select cart items from Redux store
    const cartItems = useSelector(state => state.cart.items);

    // Calculate total quantity for the navbar badge
    const totalCartItems = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.quantity, 0);
    }, [cartItems]);

    /**
     * Handle adding a plant to the shopping cart
     * @param {Object} plant - The plant object selected by the user
     */
    const handleAddToCart = useCallback((plant) => {
        dispatch(addItem(plant));
    }, [dispatch]);

    /**
     * Checks if a plant is already in the cart to update the button status
     * @param {string} plantName - Name of the plant to check
     */
    const isAddedToCart = (plantName) => {
        return cartItems.some(item => item.name === plantName);
    };

    /**
     * Navigation handlers
     */
    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = () => {
        setShowCart(false);
    };

    return (
        <div className="product-list-page">
            {/* Global Navigation Bar */}
            <nav className="navbar">
                <div className="navbar-logo" onClick={onHomeClick}>Paradise Nursery</div>
                <div className="navbar-links">
                    <a href="#" onClick={onHomeClick}>Home</a>
                    <a href="#" onClick={() => setShowCart(false)}>Plants</a>
                    <a href="#" onClick={handleCartClick} className="cart-nav-link">
                        <span className="cart-icon">🛒</span>
                        <span className="cart-amount">{totalCartItems}</span>
                    </a>
                </div>
            </nav>

            {!showCart ? (
                <div className="product-grid">
                    {plantCategories.map((group, index) => (
                        <div key={index} className="category-section">
                            <h2 className="category-title">{group.category}</h2>
                            <div className="plants-list">
                                {group.plants.map((plant, idx) => (
                                    <PlantCard 
                                        key={idx}
                                        plant={plant}
                                        isAdded={isAddedToCart(plant.name)}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
