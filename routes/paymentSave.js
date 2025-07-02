const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentModel'); // ✅ Import payment schema

// ✅ Save payment details route
router.post('/save-payment', async (req, res) => {
    try {
        const { name, email, contact, amount, orderId, paymentId, status } = req.body;

        const payment = new Payment({
            name,
            email,
            contact,
            amount,
            orderId,
            paymentId,
            status
        });

        await payment.save();

        res.status(200).json({ success: true, message: "Payment saved successfully" });
    } catch (error) {
        console.error('❌ Error saving payment:', error);
        res.status(500).json({ success: false, message: "Error saving payment" });
    }
});

// ✅ Test route to check if this route works
router.get('/test-save', (req, res) => {
    res.send('✅ Payment Save Route Working!');
});

module.exports = router;
