const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Create Mongoose model for User
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email:{type: String, required:true},
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Configure middleware
app.set('views', path.join(__dirname, 'views')); // Set the views directory
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.post('/signup', async (req, res) => {
    const { username,email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send('User already exists. Please login.');
        }
        const newUser = new User({ username,email, password });
        await newUser.save();
        res.render('signup_success'); 
        console.log("User Admitted!!")// Changed to 'signup_success'
    } catch (error) {
        res.send('Error creating user.');
    }
});

app.post('/login', async (req, res) => {
    const password=req.body.password;
    const email=req.body.email;
    const username=req.body.username;
    
        let flag=0;
        await User.find().then((result, err) => {
            for (const user of result) {
                if (user.email === email && user.password===password) {
                    res.redirect(`/?username=${user.username}`);
                    console.log("User has logged in!!");
                    flag=1;
                    break; // Exit the loop early once the user is found
                }
            }
            if(flag==0){
                console.log(result);
                console.log("else" + err);
                res.send('Invalid username or password.');
            }
        // const singleResult = result.find((name)=> {name.username === username});
        // if (singleResult) {
            

        //     console.log(singleResult);
           
        // } else {
            
        // }
    });
});



app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/', (req, res) => {
    const { username } = req.query;
    res.render('index', { username });
  });

// Start the server
app.listen(3000, () => {
    console.log(`Server running at http://localhost:${port}`);
});
