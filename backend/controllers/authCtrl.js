import mongoose from "mongoose";
import User from "../models/users.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Correctly configured dotenv

// Signup function
export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if email already exists
        const isEmail = await User.findOne({ email });
        if (isEmail) {
            return res.status(400).json({ message: 'Email already in use, please login' });
        }

        // Check if name already exists
        const isName = await User.findOne({ name });
        if (isName) {
            return res.status(400).json({ message: 'Name already in use' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ _id: newUser._id, role: newUser.role }, process.env.SECRET, { expiresIn: '1h' });

        // Respond with success message, token, and user data
        return res.status(201).json({
            message: 'User signed up successfully',
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Login function
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const currentUser = await User.findOne({ email });
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password
        const isPassword = await bcrypt.compare(password, currentUser.password);
        if (!isPassword) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: currentUser._id, role: currentUser.role }, process.env.SECRET, { expiresIn: '1h' });

        // Respond with success message, token, and user data
        return res.status(200).json({
            token,
            message: 'Logged in successfully',
            user: {
                _id: currentUser._id,
                name: currentUser.name,
                email: currentUser.email,
                role: currentUser.role
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
