import express from 'express';
import axios from 'axios';
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


router.get('/sephora/:product', async (req, res) => {
    const productName = req.params.product;

    try {
        const existingProduct = await Product.findOne({ name: productName });

        if (existingProduct) {
            return res.json(existingProduct);
        }

      
        const { data } = await axios.get(`https://api.sephora.com/products?q=${productName}`);

        if (data && data.products) {
            const product = new Product({
                name: data.products[0].name,
                category: data.products[0].category,
                price: data.products[0].price,
                rating: data.products[0].rating,
                ingredients: data.products[0].ingredients,
            });

            await product.save();
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product data' });
    }
});


router.get('/ulta/:product', async (req, res) => {
    const productName = req.params.product;

    try {
        const { data } = await axios.get(`https://api.ulta.com/products?q=${productName}`);

        if (data && data.products) {
            res.json(data.products);
        } else {
            res.status(404).json({ message: 'No products found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product data' });
    }
});


router.get('/inci/:ingredient', async (req, res) => {
    const ingredientName = req.params.ingredient;

    try {
        const { data } = await axios.get(`https://inci-beauty.com/ingredients?q=${ingredientName}`);

        if (data && data.ingredients) {
            res.json(data.ingredients);
        } else {
            res.status(404).json({ message: 'Ingredient not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ingredient data' });
    }
});


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

// @desc Get reviews for a product
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


router.get('/top', async (req, res) => {
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(5); // Top 5 products by rating
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
