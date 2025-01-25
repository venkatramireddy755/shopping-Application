const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Stripe = require('stripe'); // <-- Add Stripe import




const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
}
    
));


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const secretKey = 'your_secret_key';
const stripe = Stripe('sk_test_51PxPmtRtgr7kjgRVJ7Py58pJEsbUlR6iLXUWT3pkejpTTzd4RfGwvAsUQ4IhHdfx62EphSjVvu9JxJUNrnaWxb4x009ZaX8FgA'); // <-- Replace with your actual Stripe secret key

// Connect to MongoDB

const uri = 'mongodb+srv://arunkantipudi:Jan302004@ecommassive.lsw7t.mongodb.net/?retryWrites=true&w=majority&appName=ecommassive';
const connectDB =  async ()=>{
    try{
        const conn = await mongoose.connect(uri)
        console.log(`Connected to Host ${conn.connection.host}`);
    }catch(error){
        console.log(`Error connecting to DB ${error}`);
    }
}
connectDB();


// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Signup endpoint
app.post('/signup', async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
   
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
  
        await newUser.save();
        res.json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(200).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(200).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Protected route
app.get('/dashboard', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    try {
        const verified = jwt.verify(token, secretKey);
        res.json({ message: 'Access granted', user: verified });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

// Stripe payment endpoint
app.post('/create-checkout-session', async (req, res) => {
    const { total } = req.body;
    console.log("Received request for checkout session");
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr', // Your currency code
                        product_data: {
                            name: 'Total Bill', // Example product
                        },
                        unit_amount: total*100, // Amount in paise (500 INR)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/payment-success', // Replace with your success page route
            cancel_url: 'http://localhost:3000/payment-failed',   // Replace with your cancel page route
        });
        console.log("Stripe session created successfully:", session.id);


        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating Checkout session:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Serve React or Static Front-End
app.use(express.static(path.join(__dirname, 'client/build'))); // <-- If you have a React build

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html')); // <-- If using React
});

// Listen on port 8000
const port = 8000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



