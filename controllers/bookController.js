const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public (Anyone can read the catalog)
const getBooks = asyncHandler(async (req, res) => {
    // Find all books, showing the latest first
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
});

// @desc    Create a new book
// @route   POST /api/books
// @access  Private (Requires JWT token)
const createBook = asyncHandler(async (req, res) => {
    const { title, author, isbn, publishedDate, quantity } = req.body;

    // 1. Check for required fields
    if (!title || !author || !isbn) {
        res.status(400);
        throw new Error('Please include Title, Author, and ISBN.');
    }

    // 2. Check if a book with this ISBN already exists
    const bookExists = await Book.findOne({ isbn });
    if (bookExists) {
        res.status(400);
        throw new Error('A book with this ISBN already exists.');
    }

    // 3. Create the book
    const book = await Book.create({
        title,
        author,
        isbn,
        publishedDate,
        quantity,
        // We can link the book to the user who created it using req.user.id from the middleware
        // user: req.user.id,
    });

    res.status(201).json(book);
});


// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private (Requires JWT token)
const updateBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    // 1. Check if the book exists
    if (!book) {
        res.status(404);
        throw new Error('Book not found.');
    }

    // 2. Perform the update
    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true } // {new: true} returns the new document
    );

    res.status(200).json(updatedBook);
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private (Requires JWT token)
const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    // 1. Check if the book exists
    if (!book) {
        res.status(404);
        throw new Error('Book not found.');
    }

    // 2. Delete the book
    await Book.deleteOne({ _id: req.params.id }); 

    res.status(200).json({ id: req.params.id, message: 'Book deleted successfully' });
});

module.exports = {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
};