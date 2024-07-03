const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');

// Create a new order
router.post('/', async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const totalPrice = product.price * quantity;
        const newOrder = new Order({ product: productId, quantity, totalPrice });
        const order = await newOrder.save();

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('product');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific order
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('product');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an order
router.put('/:id', async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const totalPrice = product.price * quantity;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { product: productId, quantity, totalPrice },
            { new: true }
        ).populate('product');
        
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete an order
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;