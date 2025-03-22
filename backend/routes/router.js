const express= require('express');
const {add_cart,see_added_cart,delete_item} = require("../jsofbackend/wishlistcontroller");
const router = express.Router();

router.post('/add',add_cart);
router.get('/see_cart',see_added_cart);
router.get('/delete_item',delete_item);

module.exports = router;
