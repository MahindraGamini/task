import express from 'express';
import { createProduct, getProducts,getProductById } from '../controllers/productCtrl.js';
import authMiddleware from '../middleware/auth.js';

const product = express.Router();

// Route to create a product (protected)
product.post('/create', authMiddleware([1]), createProduct);

// Route to get all products (public)
product.get('/', getProducts);
product.get('/:productId', getProductById);

export default product;
