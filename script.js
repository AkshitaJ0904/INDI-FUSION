const express = require('express');
const app= express();
const port = 5500;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(port,()=>{
    console.log(`App listening to port ${port}`)
})

app.get('/index', (req, res) => {
    res.render('index'); 
});

app.get('/loginpage', (req, res) => {
    res.render('loginpage');
});

app.get('/aboutus', (req, res) => {
    res.render('aboutus');
});

app.get('/address', (req, res) => {
    res.render('address');
});

app.get('/artgallery', (req, res) => {
    res.render('artgallery');
});

app.get('/artgallerypoduct', (req, res) => {
    res.render('artgallerypoduct');
});

app.get('/bestseller', (req, res) => {
    res.render('bestseller');
});

app.get('/fashionpage', (req, res) => {
    res.render('fashionpage');
});

app.get('/home_decor', (req, res) => {
    res.render('home_decor');
});

app.get('/mydashboard', (req, res) => {
    res.render('mydashboard');
});

app.get('/new_address', (req, res) => {
    res.render('new_address');
});

app.get('/shoppingcart', (req, res) => {
    res.render('shoppingcart');
});

app.get('/wishlist', (req, res) => {
    res.render('wishlist');
});


// app.get('/events', (req, res) => {
//     res.render('events'); 
// });
// app.get('/contactus', (req, res) => {
//     res.render('contactus'); 
// });

