const express = require('express');
const router = express.Router();
const razorpay = require('../razorpay');
const { v4: uuidv4 } = require('uuid');

// ✅ Test route to check if it's working
router.get('/test', (req, res) => {
    res.send('Payment route works perfectly!');
});

// ✅ Create order route
router.post('/create-order', async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: uuidv4(),
        };

        const order = await razorpay.orders.create(options);

        if (!order) return res.status(500).send("Error creating order");

        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
});

module.exports = router;
