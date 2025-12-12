const mongoose = require('mongoose');

// Function to connect to the database
const connectDB = async () => {
    try {
        // Mongoose will use the URI from the MONGO_URI variable in the .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Log the error and exit the process if the connection fails
        console.error(`Error: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = connectDB;