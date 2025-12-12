const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check for token in the authorization header (Bearer <token>)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header (removes 'Bearer ' prefix)
            token = req.headers.authorization.split(' ')[1];

            // Verify token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the decoded token ID (but exclude the password field)
            req.user = await User.findById(decoded.id).select('-password');

            // Move to the next middleware/controller function
            next();
        } catch (error) {
            console.error(error);
            res.status(401); // Unauthorized
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401); // Unauthorized
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };