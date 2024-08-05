import mongoose ,{Schema} from "mongoose";

import pkg from 'mongoose';
const {model,models} = pkg; 

const FeedbackModel = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    }
}, { timestamps: true });

const Feedback = models.Feedback || model('Feedback', FeedbackModel);
export default Feedback;