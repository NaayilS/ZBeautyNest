import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});


router.post('/', async (req, res) => {
    try {
        const { name, category, rating, price, ingredients } = req.body;
        const product = new Product({ name, category, rating, price, ingredients });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Invalid product data' });
    }

router.post('/:id/reviews', async (req, res) => {
    const { rating, comment, user } = req.body;
    
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            const review = {
                user,
                rating: Number(rating),
                comment,
            };

            product.reviews.push(review);
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

            await product.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/:id/reviews', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product.reviews);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/filter', async (req, res) => {
    const { include, exclude } = req.query;

    try {
        const query = {};

        if (include) {
            query.ingredients = { $all: include.split(',') };
        }

        if (exclude) {
            query.ingredients = { $nin: exclude.split(',') };
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});



});

export default router;
