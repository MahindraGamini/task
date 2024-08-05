import mongoose from "mongoose";
import pkg from 'mongoose';
const {model,models} = pkg; 

const UserModel =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
type:Number,
default:0,
// 0 for user 1 for admins
required:true

    }
})
const User = models.User|| model('User',UserModel);
export default User;

