const express = require('express');
const stripe = require('stripe')(YOUR_STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your payment.' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});