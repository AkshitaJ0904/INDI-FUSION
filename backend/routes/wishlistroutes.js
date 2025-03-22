// const mongoose = require("mongoose");

// // Define the schema for individual wishlist items
// const wishlistItemSchema = new mongoose.Schema({
//     name: { type: String, required: true }, // Item name is required
//     description: { type: String, default: "" }, // Optional description
//     price: { type: Number, default: 0 }, // Optional price, default is 0
//     link: { type: String, default: "" } // Optional link
// });

// // Define the schema for the wishlist
// const wishlistSchema = new mongoose.Schema({
//     userId: { type: String, required: true, unique: true }, // User ID is required and must be unique
//     items: { type: [wishlistItemSchema], default: [] } // Array of wishlist items
// });

// // Create the Wishlist model
// const Wishlist = mongoose.model("Wishlist", wishlistSchema);

// module.exports = Wishlist;


const express = require("express");
const router = express.Router();
const wishlistController = require("../jsofbackend/wishlistcontroller"); // Import the controller

// Route to add an item to the wishlist
router.post("/add", wishlistController.addItem);

// Route to get all wishlist items for a specific user
router.get("/:userId", wishlistController.getWishlistByUserId);
++
// Route to remove an item from the wishlist
router.delete("/remove/:itemId", wishlistController.removeItem);

// Route to update an item in the wishlist
router.put("/update/:itemId", wishlistController.updateItem);

module.exports = router;
