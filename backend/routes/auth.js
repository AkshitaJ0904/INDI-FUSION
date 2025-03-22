const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/model");
const router = express.Router();

// Generate OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register/Login with Email or Mobile
router.post('/auth/initiate', async (req, res) => {
    try {
        const { email, mobileNumber } = req.body;
        
        if (!email && !mobileNumber) {
            return res.status(400).json({ message: "Please provide email or mobile number" });
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

        // Find existing user or create new one
        let user = await User.findOne({
            $or: [{ email }, { mobileNumber }]
        });

        if (!user) {
            // Create new user
            user = new User({
                email: email || undefined,
                mobileNumber: mobileNumber || undefined,
                authMethod: email ? 'email' : 'mobile',
                otp: {
                    code: otp,
                    generatedAt: new Date(),
                    expiresAt: otpExpiry,
                    verified: false
                }
            });
        } else {
            // Update existing user's OTP
            user.otp = {
                code: otp,
                generatedAt: new Date(),
                expiresAt: otpExpiry,
                verified: false
            };
        }

        await user.save();

        // Log OTP in terminal for development
        console.log(`Generated OTP: ${otp} (For user: ${email || mobileNumber})`); // Updated log

        res.status(200).json({ 
            message: "OTP sent successfully",
            userId: user._id
        });

    } catch (error) {
        console.error('Auth initiation error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Verify OTP
router.post('/auth/verify-otp', async (req, res) => {
    try {
        const { userId, otp } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.otp.code || user.otp.expiresAt < new Date()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        if (user.otp.code !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Mark OTP as verified
        user.otp.verified = true;
        user.isVerified = true;
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({ 
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                mobileNumber: user.mobileNumber,
                name: user.name
            }
        });

    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Google Sign In (placeholder - needs Google OAuth implementation)
router.post('/auth/google', async (req, res) => {
    try {
        const { googleId, email, name } = req.body;

        let user = await User.findOne({ googleId });
        if (!user) {
            user = new User({
                googleId,
                email,
                name,
                authMethod: 'google',
                isVerified: true
            });
            await user.save();
        }

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({ 
            message: "Google login successful",
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });

    } catch (error) {
        console.error('Google auth error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
