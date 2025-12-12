const asyncHandler = require('express-async-handler'); // Simple package for error handling
const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); 

// --- Helper function to generate JWT ---
// This token is sent to the client and used to access protected routes later
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // 1. Check if all fields are present
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please include all fields: name, email, and password');
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // 3. Create user (password hashing is done automatically in the User model pre-save hook)
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        // Return success response with a token
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


// @desc    Authenticate a user (login)
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1. Find user by email, and use .select('+password') to retrieve the password field
    const user = await User.findOne({ email }).select('+password');

    // 2. Check user and password match
    if (user && (await user.matchPassword(password))) {
        // Return success response with a token
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401); // Unauthorized
        throw new Error('Invalid credentials');
    }
});


// Export the functions
module.exports = {
    registerUser,
    loginUser
};