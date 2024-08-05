// src/pages/ProductListing.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('http://localhost:3001/product/')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddProduct = () => {
    navigate('/products/create'); 
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {user?.role === 1 && (
        <button
          onClick={handleAddProduct}
          className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Product
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="border rounded-lg p-4">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p> ₹{ product.price}</p>
            <Link to={`/products/${product._id}`} className="text-blue-500 mt-2 block">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
