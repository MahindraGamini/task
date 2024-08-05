import mongoose from "mongoose";
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import route from "./routes/authUser.js";
import product from "./routes/productroute.js";
import feedback from "./routes/feedbackroute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Setup CORS
app.use(cors({
    origin: "http://localhost:3000" // Make sure the origin is correctly formatted
}));

// Setup routes
app.use('/auth', route);
app.use('/product',product)
app.use('/feedback',feedback);

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
