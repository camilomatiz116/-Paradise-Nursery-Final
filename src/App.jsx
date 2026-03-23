import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

/**
 * App Component
 * Orchestrates the transition between the Landing Page and the Product Catalog.
 */
function App() {
  const [isCatalogVisible, setIsCatalogVisible] = useState(false);

  /**
   * Switch to the plant catalog view.
   */
  const handleGetStarted = () => {
    setIsCatalogVisible(true);
  };

  /**
   * Switch back to the home/landing page.
   */
  const handleHomeNavigation = () => {
    setIsCatalogVisible(false);
  };

  return (
    <div className="app-container">
      {!isCatalogVisible ? (
        <section className="landing-page">
          <div className="background-image"></div>
          <div className="content">
            <div className="landing_content">
              <h1>Welcome To Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Greenery Meets Serenity</p>
              <button className="get-started-button" onClick={handleGetStarted}>
                Get Started
              </button>
            </div>
            <div className="aboutus_container">
              <AboutUs/>
            </div>
          </div>
        </section>
      ) : (
        <main className="product-list-container">
          <ProductList onHomeClick={handleHomeNavigation} />
        </main>
      )}
    </div>
  );
}

export default App;
