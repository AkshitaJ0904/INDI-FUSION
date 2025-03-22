const mongoose = require("mongoose");
const Wishlist = require("../model/wishlistmodel"); // Adjust the path if necessary
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://dhanushkumar:JcEI%40398@wishlistcluster.o35k7.mongodb.net/wishlist?retryWrites=true&w=majority&appName=wishlistcluster";

// Connect to the database
async function connectDatabase() {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    }
}

// Close the database connection
async function closeConnection() {
    try {
        await mongoose.connection.close();
        console.log("Database connection closed");
    } catch (err) {
        console.error("Error closing database connection:", err.message);
    }
}

// Parse command-line arguments
const args = process.argv.slice(2);
const command = args[0];

// Main CLI logic
(async () => {
    await connectDatabase();

    try {
        switch (command) {
            case "add": {
                const userId = args[1];
                const name = args[2];
                const description = args[3] || "";
                const price = parseFloat(args[4]) || 0;
                const link = args[5] || "";

                if (!userId || !name) {
                    console.log("Usage: node wishlistCli.js add <userId> <name> [description] [price] [link]");
                    break;
                }

                // Find or create wishlist
                let wishlist = await Wishlist.findOne({ userId });
                if (!wishlist) {
                    wishlist = new Wishlist({ userId, items: [] });
                }

                // Add new item
                wishlist.items.push({ name, description, price, link });
                await wishlist.save();

                console.log("Item added to wishlist:", wishlist.items);
                break;
            }

            case "list": {
                const userIdToView = args[1];

                if (!userIdToView) {
                    console.log("Usage: node wishlistCli.js list <userId>");
                    break;
                }

                const userWishlist = await Wishlist.findOne({ userId: userIdToView });
                if (!userWishlist) {
                    console.log("No wishlist found for this user.");
                } else {
                    console.log("Wishlist for user:", userWishlist.items);
                }
                break;
            }

            case "remove": {
                const userIdToRemove = args[1];
                const itemId = args[2];

                if (!userIdToRemove || !itemId) {
                    console.log("Usage: node wishlistCli.js remove <userId> <itemId>");
                    break;
                }

                const wishlistToModify = await Wishlist.findOne({ userId: userIdToRemove });
                if (!wishlistToModify) {
                    console.log("No wishlist found for this user.");
                } else {
                    // Find and remove the item by ID
                    const itemIndex = wishlistToModify.items.findIndex(item => item._id.toString() === itemId);
                    if (itemIndex > -1) {
                        wishlistToModify.items.splice(itemIndex, 1);
                        await wishlistToModify.save();
                        console.log("Item removed. Updated wishlist:", wishlistToModify.items);
                    } else {
                        console.log("Item not found.");
                    }
                }
                break;
            }

            default:
                console.log("Invalid command. Available commands: add, list, remove");
                console.log("Usage:");
                console.log("  node wishlistCli.js add <userId> <name> [description] [price] [link]");
                console.log("  node wishlistCli.js list <userId>");
                console.log("  node wishlistCli.js remove <userId> <itemId>");
                break;
        }
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await closeConnection();
    }
})();
