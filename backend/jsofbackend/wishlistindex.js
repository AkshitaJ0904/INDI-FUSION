let express = require("express")
let app = express();
app.listen("3003", ()=>{
    console.log("server is connected")
})

let dbconnect = require("./js/wishlistconnect"); 
dbconnect()

// /frontend/js/wishlist.js
const apiUrl = 'http://localhost:3000/api/wishlist';

// Add item to wishlist
function addItemToWishlist(productId, productName, price, userId) {
    const item = { productId, productName, quantity: 1, price, userId };
    fetch(`${apiUrl}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => console.log('Item added:', data))
    .catch(error => console.error('Error adding item:', error));
}

// Fetch all items in wishlist
function fetchWishlist() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log('Wishlist:', data);
        // Render wishlist items on the page here
    })
    .catch(error => console.error('Error fetching wishlist:', error));
}

// Remove item from wishlist
function removeItemFromWishlist(itemId) {
    fetch(`${apiUrl}/${itemId}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => console.log('Item removed:', data))
    .catch(error => console.error('Error removing item:', error));
}

