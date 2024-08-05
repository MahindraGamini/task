// src/components/Home.js
import React from 'react';
import ProductListing from '../pages/ProductListing';

const Home = () => {
  const user = localStorage.getItem('user');
  const userData = user ? JSON.parse(user) : null; // Parse JSON if user data exists

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the Feedback App {userData ? <span>{userData.name}</span> : <span>Guest</span>}
      </h1>
      <p className="text-lg">Explore products, give feedback, and view feedbacks from vendors.</p>

      <ProductListing />
    </div>
  );
};

export default Home;
