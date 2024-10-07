import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// @desc Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc Create a new product
router.post('/', async (req, res) => {
    try {
        const { name, category, rating, price, ingredients } = req.body;
        const product = new Product({ name, category, rating, price, ingredients });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Invalid product data' });
    }
});

export default router;
