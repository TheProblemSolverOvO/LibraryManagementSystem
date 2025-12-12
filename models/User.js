const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

// Define the structure of a User document
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true, // Email must be unique for login
            trim: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please enter a valid email'
            ]
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: 6,
            select: false // Ensures password field is not returned by default when querying the database
        },
        // We'll add a 'role' later if needed for Authorization, but for now, keep it simple.
    },
    {
        timestamps: true
    }
);

// --- PASSWORD HASHING MIDDLEWARE ---
// Mongoose middleware to run *before* saving a user
userSchema.pre('save', async function() {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) {
        return; // Just return, don't call next()
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password
    this.password = await bcrypt.hash(this.password, salt);
    
    // Logic ends here successfully automatically
});

// --- PASSWORD COMPARISON METHOD ---
// Add a method to the userSchema for comparing passwords during login
userSchema.methods.matchPassword = async function(enteredPassword) {
    // Compare the entered password with the hashed password stored in the database
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

module.exports = User; 