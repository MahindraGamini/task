import express from 'express';
import { submitFeedback, getFeedbackForProduct } from '../controllers/feedbackCtrl.js';
import authMiddleware from '../middleware/auth.js';

const feedback = express.Router();


feedback.post('/products/:productId/', authMiddleware([0]), submitFeedback);


feedback.get('/products/:productId/', authMiddleware([1]), getFeedbackForProduct);

export default feedback;
