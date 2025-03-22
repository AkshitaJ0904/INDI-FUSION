const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    // Basic Info
    email: {
        type: String,
        trim: true,
        lowercase: true,
        sparse: true,
        index: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    mobileNumber: {
        type: String,
        trim: true,
        sparse: true,
        index: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid mobile number']
    },
    
    // Authentication Method
    authMethod: {
        type: String,
        enum: ['email', 'mobile', 'google'],
        required: true
    },
    
    // Google Auth Details
    googleId: {
        type: String,
        sparse: true,
        index: true
    },
    
    // OTP Related Fields
    otp: {
        code: String,
        generatedAt: Date,
        expiresAt: Date,
        verified: {
            type: Boolean,
            default: false
        }
    },
    
    // Account Status
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    
    // Profile Info
    name: {
        type: String,
        trim: true
    },
    profilePicture: String,
    
    // Timestamps
    lastLogin: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Indexes for faster queries
userSchema.index({ email: 1 }, { unique: true, sparse: true });
userSchema.index({ mobileNumber: 1 }, { unique: true, sparse: true });
userSchema.index({ googleId: 1 }, { unique: true, sparse: true });

// Pre-save middleware to update timestamps
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;