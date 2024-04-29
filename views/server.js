const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://12212170:Hh1AC9fmT8reEJOZ@aiharmoniescluster1.pckqy9b.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create Mongoose model for User
const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}));

// Configure middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line

// Routes



app.get('/signup_success', (req, res) => {
    res.render('signup_success');
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send('User already exists. Please login.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.redirect('/signup_success');
        console.log("User Admitted!!");
    } catch (error) {
        res.send('Error creating user.');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.send('Invalid email or password.');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.send('Invalid email or password.');
        }
        res.redirect(`/?username=${user.username}`);
        console.log("User has logged in!!");
    } catch (error) {
        res.send('Error logging in.');
    }
});
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.get('/', (req, res) => {
    const username = req.query.username || ''; // Get username from query parameter or set default value
    res.render('index', { username });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
