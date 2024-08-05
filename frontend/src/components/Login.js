// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Replaces useHistory in React Router v6

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', formData);
      const { token, user } = response.data;

      // Store token and user information in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful');
      navigate('/'); 
    } catch (error) {
      console.error(error);
      alert('Error logging in');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white border border-gray-300 rounded-lg px-8 pt-6 pb-8 mb-4 max-w-sm mx-auto"
      style={{ fontFamily: "'Amazon Ember', Arial, sans-serif", boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Sign in</h2>
      <div className="mb-4">
        <label className="block text-gray-800 text-sm mb-1" htmlFor="email">
          Email or mobile phone number
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-sm w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-yellow-600"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 text-sm mb-1" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 rounded-sm w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-yellow-600"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-sm w-full focus:outline-none focus:shadow-outline"
        >
          Sign in
        </button>
      </div>
     
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">New Here? 
          <Link to="/signup" className="text-blue-600 hover:underline"> Create your first account</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
