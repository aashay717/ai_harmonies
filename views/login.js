const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/gfg', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const User = mongoose.model('User', {
    username: String,
    password: String
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/login', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    res.render('login');
});

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username, password: password });
    if (user) {
        res.send('Login successful');
    } else {
        res.send('Invalid username or password');
    }
});

app.listen(3000, () => {
    console.log(`Server running at http://localhost:${port}`);
});
