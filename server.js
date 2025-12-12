// Load environment variables from .env file
require('dotenv').config(); 

const express = require('express');
const connectDB = require('./config/db'); 

// *** ADDED: Import CORS ***
const cors = require('cors'); 

// *** Import the User Routes ***
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes'); 
// *** Import Basic Error Handler ***
const { errorHandler } = require('./middleware/errorMiddleware'); 

connectDB();

const app = express();

// *** CORS MIDDLEWARE ADDITION ***
// Allows cross-origin requests from tools like Postman and front-end clients
app.use(cors()); 

// Middleware to parse incoming JSON data (Crucial for handling API request bodies)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Basic Route for testing
app.get('/', (req, res) => {
    res.send('API Running...');
});

// Define the base path for user routes
app.use('/api/users', userRoutes)
//Define the base path for book routes
app.use('/api/books', bookRoutes)

// Custom error handler middleware
app.use(errorHandler)

// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));