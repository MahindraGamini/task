import express from 'express';
import authMiddleware from '../middleware/auth.js'; // Ensure the correct path
import { login, signup } from '../controllers/authCtrl.js'; // Ensure this path is correct

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authMiddleware(), (req, res) => {
  console.log('Profile route accessed');
  res.status(200).json({ message: 'Welcome to your profile', user: req.user });
});
router.get('/admin', authMiddleware([1]), (req, res) => {
    res.status(200).json({ message: 'Welcome Admin', user: req.user });
  });

export default router;
