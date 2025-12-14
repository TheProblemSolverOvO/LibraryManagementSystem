const mongoose = require('mongoose');

// Define the structure of a Book document
const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'], // The field must exist
            trim: true
        },
        author: {
            type: String,
            required: [true, 'Please add an author name'],
            trim: true
        },
        isbn: {
            type: String,
            required: [true, 'Please add the ISBN'],
            unique: true, // This ensures no two books have the same ISBN
        },
        publishedDate: {
            type: Date,
            required: false // Optional field
        },
        quantity: {
            type: Number,
            required: true,
            default: 1, // Default quantity when a new book is added
            min: 0
        },
        // i need to link this to the User model later for Authorization
        // user: { 
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true, 
        //     ref: 'User'
        // }
    },
    {
        timestamps: true // Adds 'createdAt' and 'updatedAt' fields automatically
    }
);

// Create and export the Mongoose Model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;