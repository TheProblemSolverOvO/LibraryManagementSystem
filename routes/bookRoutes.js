const express = require('express');
const router = express.Router();
const {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
} = require('../controllers/bookController');

// Import the Authorization Middleware
const { protect } = require('../middleware/authMiddleware');

// The GET route (Read All) is public. The POST route (Create) is protected.
router.route('/').get(getBooks).post(protect, createBook);

// The PUT (Update) and DELETE routes require a Book ID parameter and are protected.
router.route('/:id').put(protect, updateBook).delete(protect, deleteBook);

module.exports = router;