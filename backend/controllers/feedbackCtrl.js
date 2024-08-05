import Feedback from '../models/feedback.js'
import Products from "../models/products.js";
export const submitFeedback = async (req, res) => {
    const { comment } = req.body;
    const { productId } = req.params; 
    try {
        const product = await Products.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const feedback = new Feedback({
            product: productId,
            customer: req.user._id,  
            comment
        });

        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getFeedbackForProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Products.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.vendor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const feedbacks = await Feedback.find({ product: productId }).populate('customer', 'name email');
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
