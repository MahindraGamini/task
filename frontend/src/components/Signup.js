// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 0 // 0 for user, 1 for vendor
  });

  const navigate = useNavigate(); // Use navigate for programmatic navigation

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
      const response = await axios.post('http://localhost:3001/auth/signup', formData);
      const { token, user } = response.data;

      // Store token and user information in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('User signed up successfully');
      navigate('/dashboard'); // Redirect to the dashboard after signup
    } catch (error) {
      console.error(error);
      alert('Error signing up user');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white border border-gray-300 rounded-lg px-8 pt-6 pb-8 mb-4 mt-4 max-w-sm mx-auto"
      style={{ fontFamily: "'Amazon Ember', Arial, sans-serif", boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Create account</h2>
      <div className="mb-4">
        <label className="block text-gray-800 text-sm mb-1" htmlFor="name">
          Your name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-sm w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-yellow-600"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-800 text-sm mb-1" htmlFor="email">
          Email
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
      <div className="mb-4">
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
        <p className="text-xs text-gray-600 mt-1">Passwords must be at least 6 characters.</p>
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 text-sm mb-1" htmlFor="role">
          Role
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border border-gray-300 rounded-sm w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-yellow-600"
        >
          <option value={0}>User</option>
          <option value={1}>Vendor</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-sm w-full focus:outline-none focus:shadow-outline"
        >
          Create your account
        </button>
      </div>
    
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">Already have an account? 
          <Link to="/login" className="text-blue-600 hover:underline"> Sign in</Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
