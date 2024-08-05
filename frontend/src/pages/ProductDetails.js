// src/pages/ProductDetails.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch product details
    axios.get(`http://localhost:3001/product/${productId}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));
    
    // Fetch feedbacks if user is a vendor
    if (user && user.role === 1) { // Assuming role 1 is for vendors
      axios.get(`http://localhost:3001/feedback/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => setFeedbacks(response.data))
        .catch(error => console.error(error));
    }
  }, [productId, user]);

  const handleFeedbackSubmit = () => {
    axios.post(`http://localhost:3001/feedback/products/${productId}`, { comment }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        alert('Feedback submitted successfully');
        setComment('');
      })
      .catch(error => console.error(error));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p>{product.description}</p>

      <p>Price :₹{product.price}</p>

      {user && user.role === 0 && ( // Assuming role 0 is for customers
        <div className="mt-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded-lg p-2"
            placeholder="Leave your feedback"
          />
          <button
            onClick={handleFeedbackSubmit}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit Feedback
          </button>
        </div>
      )}

      {user && user.role === 1 && ( // Assuming role 1 is for vendors
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Feedbacks</h2>
          {feedbacks.length > 0 ? (
            feedbacks.map(feedback => (
              <div key={feedback._id} className="border rounded-lg p-4 mb-4">
                <p>{feedback.comment}</p>
                <p className="text-gray-500">by {feedback.customer.name}</p>
              </div>
            ))
          ) : (
            <p>No feedbacks yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
