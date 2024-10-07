import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Connect to the MongoDB database
connectDB();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Define Routes
app.use('/api/products', productRoutes);

// Default Route (Optional, for testing server)
app.get('/', (req, res) => {
    res.send('Welcome to ZBeautyNest API!');
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
