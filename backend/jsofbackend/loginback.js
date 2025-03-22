const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model/model"); // Ensure schema is correct

const app = express();

// Middleware
app.use(express.json());
app.use(cors());  // Enable CORS for cross-origin requests

// MongoDB Connection
const connectDB = async () => {
    try {
        const con_string = "mongodb+srv://dhanushkumar:JcEI%40398@wishlistcluster.o35k7.mongodb.net/loginDB?retryWrites=true&w=majority&appName=wishlistcluster";
        await mongoose.connect(con_string, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

// Authentication Route
app.post('/login', async (req, res) => {
    const { credential, password, type } = req.body;

    if (!credential || !password || !type) {
        return res.status(400).json({ message: "Credential, password, and type are required" });
    }

    try {
        // Find user by email or phone based on 'type'
        let user;
        if (type === 'email') {
            user = await User.findOne({ email: credential });
        } else if (type === 'phone') {
            user = await User.findOne({ phone: credential });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, 'yourSecretKey', { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful",
            token, // Send token to frontend
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Start server
const startServer = (port) => {
    const server = app.listen(port, () => {
        console.log('Server is running on port ${port}');
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log('Port ${port} is busy. Trying ${port + 1}...');
            startServer(port + 1); // Recursively try the next port
        } else {
            console.error('Server error:', err);
        }
    });
};

const PORT = process.env.PORT || 5500;

// Connect to MongoDB
connectDB();

// Start server on initial port
startServer(PORT);