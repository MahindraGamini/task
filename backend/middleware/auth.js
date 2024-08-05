import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/users.js';

dotenv.config(); 

const authMiddleware = (requiredRoles = []) => {
  return async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;

      const user = await User.findById(decoded._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
};

export default authMiddleware;
