// // /backend/controllers/wishlistController.js
// const Wishlist = require('../models/Wishlist');

// // Add item to wishlist
// exports.addItem = async (req, res) => {
//     try {
//         const { productId, productName, quantity, price, userId } = req.body;
//         const newItem = new Wishlist({ productId, productName, quantity, price, userId });
//         await newItem.save();
//         res.status(201).json(newItem);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to add item", error });
//     }
// };

// // Get all items in wishlist
// exports.getWishlist = async (req, res) => {
//     try {
//         const wishlist = await Wishlist.find();
//         res.status(200).json(wishlist);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch wishlist", error });
//     }
// };

// // Remove item from wishlist
// exports.removeItem = async (req, res) => {
//     try {
//         const itemId = req.params.id;
//         await Wishlist.findByIdAndDelete(itemId);
//         res.status(200).json({ message: "Item removed from wishlist" });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to remove item", error });
//     }
// };



const Wishlist = require("../model/wishlistmodel");


const add_cart = async (req, res) => {
    try{
        const {title, description,imgSrc} = req.body ;
        const adding = await Wishlist.create(req.body);
        console.log(adding);
        res.status(200).json({success:true,
            message: "Added wishlist",
            adding
        
        });
    }catch(err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Failed to add"
        });
    }
}

const see_added_cart = async(req,res)=>{
    try{
        const cart = await Wishlist.find({});

        if(!cart){
            return res.status(404).json({
                success:false,
                message:"ITEM NOT ADDED"
            });
        }

        res.status(200).json({
            success:true,
            message:"Groups fetched successfully!!",
            see
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to fetch item"
        });
    }
}
 

const delete_item = async (req,res)=>{
    try{
        const {id} = req.params;
        let item = await Wishlist.findOne({_id:id});
        if(!item) {
            return res.status(404).json({
                success:false,
                message:"Item not found"
            });
        }

        item = await Wishlist.findByIdAndDelete({_id:id});
        res.status(200).json({
            success:true,
            message:"Item removed successsfully",
            item
        });
    }catch(err) {
        return res.status(400).json({
            success:false,
            message:"Failed to remove item"
        })
       
    }
};


// // const Cart = require("../model/shoppingcartmodel");

// // GET /wishlist - Retrieve wishlist items
// const getWishlist = async (req, res) => {
//   try {
//     const items = await Wishlist.find();
//     res.status(200).json(items);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching wishlist items", error });
//   }
// };

// // POST /wishlist - Add an item to the wishlist
// const createWishlistItem = async (req, res) => {
//   const { title, description, imgSrc } = req.body;

//   const newItem = new Wishlist({ title, description, imgSrc });

//   try {
//     const savedItem = await newItem.save();
//     res.status(201).json(savedItem);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding to wishlist", error });
//   }
// };

// // POST /wishlist/:id/move-to-cart - Move an item from wishlist to cart
// const moveToCart = async (req, res) => {
//   try {
//     const item = await Wishlist.findById(req.params.id);
//     if (!item) return res.status(404).json({ message: "Item not found" });

//     // Add to Cart
//     const newCartItem = new Cart({
//       title: item.title,
//       description: item.description,
//       imgSrc: item.imgSrc,
//     });

//     await newCartItem.save();

//     // Remove from Wishlist
//     await Wishlist.findByIdAndDelete(req.params.id);

//     res.status(200).json({ message: "Moved to cart", item: newCartItem });
//   } catch (error) {
//     res.status(500).json({ message: "Error moving item to cart", error });
//   }
// };

// module.exports = {
//   getWishlist,
//   createWishlistItem,
//   moveToCart,
// };
