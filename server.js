const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = 7300;

const uri = "mongodb+srv://12212170:0oHipYf8Pl5lgaEz@cluster0.w5fxh6q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

connectToMongoDB();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/signup_success', (req, res) => {
    const message = req.query.message || '';
    res.render('signup_success', { message });
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const db = client.db('newest');
        const collection = db.collection('users');

        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return res.redirect('/signup_success?message=User%20already%20exists.%20Please%20login.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await collection.insertOne({ username, email, password: hashedPassword });
        res.redirect('/signup_success?message=Signup%20successful!');
        console.log("User Admitted!!");
    } catch (error) {
        res.redirect('/signup_success?message=Error%20creating%20user.');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = client.db('newest'); // Use the correct database name
        const collection = db.collection('users');

        const user = await collection.findOne({ email });
        if (!user) {
            return res.redirect('/login?message=Invalid%20email%20or%20password.');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.redirect('/login?message=Invalid%20email%20or%20password.');
        }
        res.redirect(`/?username=${encodeURIComponent(user.username)}`);
        console.log("User has logged in!!");
    } catch (error) {
        res.redirect('/login?message=Error%20logging%20in.');
    }
});


app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    const username = req.query.username || '';
    res.render('index', { username });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

async function closeMongoDBConnection() {
    try {
        await client.close();
        console.log('Connection to MongoDB closed');
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
    }
}

// Close MongoDB connection when the app is terminated
process.on('SIGINT', async () => {
    await closeMongoDBConnection();
    process.exit();
});

process.on('SIGTERM', async () => {
    await closeMongoDBConnection();
    process.exit();
});
