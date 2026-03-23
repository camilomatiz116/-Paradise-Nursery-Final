import React from 'react';
import './AboutUs.css';

/**
 * AboutUs Component
 * Provides background information about Paradise Nursery.
 */
function AboutUs() {
  return (
    <div className="about-us-container">
      <h1 className="about-us-title">About Us</h1>
      <p className="about-us-description">Welcome to Paradise Nursery!</p>
      <p className="about-us-content">
        We are passionate about bringing nature closer to you. Our mission is to provide high-quality 
        plants that enhance your surroundings and contribute to a healthier lifestyle.
      </p>
      <p className="about-us-content">
        Our team ensures that each plant meets strict standards. 
        Whether you are a seasoned gardener or just starting, we are here to help.
      </p>
    </div>
  );
}

export default AboutUs;
