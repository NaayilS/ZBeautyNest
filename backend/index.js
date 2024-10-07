import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Connect to Database
connectDB();

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to ZBeautyNest API!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
