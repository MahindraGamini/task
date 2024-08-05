import mongoose, { Schema } from "mongoose";
import pkg from 'mongoose';
const {model,models} = pkg; 

const ProductModel = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Products = models.Products || model('Products', ProductModel);
export default Products;