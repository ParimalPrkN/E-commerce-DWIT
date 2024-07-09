const express = require('express');
const paymentController = require('../controllers/paymentController');
const bodyParser = require('body-parser');

const router = express.Router();

// Use body-parser middleware to handle raw body for webhook
router.use(bodyParser.json());
router.use(bodyParser.raw({ type: 'application/json' }));

// Routes
router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.post('/webhook', paymentController.handleWebhook);

module.exports = router;
