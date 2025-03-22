require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Wishlist = require("../model/wishlistmodel"); // Import the model

const app = express();
app.use(express.json()); // For parsing JSON requests

// Route to add a wishlist item
app.post("/addWishlist", async (req, res) => {
  try {
    const { itemName, userId } = req.body; // Destructure input
    const newItem = new Wishlist({ itemName, userId }); // Create document
    await newItem.save(); // Save to MongoDB

    res.status(201).json({ message: "Item added to wishlist!", item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding item", error: error.message });
  }
});

// MongoDB connection
mongoose
  .connect("mongodb+srv://dhanushkumar:JcEI%40398@wishlistcluster.o35k7.mongodb.net/?retryWrites=true&w=majority&appName=wishlistcluster", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));






