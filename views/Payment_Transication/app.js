const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Import and use the routes
const paymentRoute = require('./routes/paymentRoute');
app.use('/', paymentRoute);

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
