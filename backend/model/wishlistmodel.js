const mongoose = require("mongoose");
const {type}= require('os');


// const itemSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, default: "" },
//     price: { type: Number, default: 0 },
//     link: { type: String, default: "" },
// });


// const wishlistSchema = new mongoose.Schema(
//     {
//         userId: { type: String, required: true },
//         items: { type: [itemSchema], default: [] },
//     },
//     {
//         collection: "wishlists", 
//         timestamps: true,        
//     }
// );


// const Wishlist = mongoose.model("Wishlist", wishlistSchema);

// module.exports = Wishlist;



// const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imgSrc: { type: String, required: true },
  
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
