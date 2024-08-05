import Products from "../models/products.js";

export const createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const product = new Products({
            name,
            description,
            price,
            vendor: req.user._id  // Ensure this matches the schema reference
        });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Products.find().populate('vendor', 'name email');
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// src/controllers/productCtrl.js

export const getProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Products.findById(productId).populate('vendor', 'name email');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
