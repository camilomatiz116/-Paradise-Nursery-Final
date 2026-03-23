import React from 'react';

/**
 * PlantCard Component
 * Displays individual plant information including image, name, description, and price.
 * 
 * @param {Object} props
 * @param {Object} props.plant - The plant object data
 * @param {boolean} props.isAdded - Whether the plant is already in the cart
 * @param {Function} props.onAddToCart - Callback when "Add to Cart" is clicked
 */
const PlantCard = ({ plant, isAdded, onAddToCart }) => {
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={plant.image} alt={plant.name} className="product-image" />
            </div>
            <div className="product-info">
                <h3 className="product-name">{plant.name}</h3>
                <p className="product-description">{plant.description}</p>
                <p className="product-price">{plant.cost}</p>
                <button 
                    className={`add-to-cart-btn ${isAdded ? 'disabled' : ''}`}
                    disabled={isAdded} 
                    onClick={() => onAddToCart(plant)}
                >
                    {isAdded ? 'Added' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default PlantCard;
