const mongoose = require("mongoose"); 
const con_string = "mongodb+srv://dhanushkumar:JcEI%40398@wishlistcluster.o35k7.mongodb.net/loginDB?retryWrites=true&w=majority&appName=wishlistcluster";

let dbconnect = () => {
    return mongoose.connect(conn_string, {})
        .then(() => {
            console.log("Connected Successfully to MongoDB!!");
        })
        .catch((err) => {
            console.error("⚠ Failed to connect with database:", err);
            throw err; 
        });
};

module.exports = dbconnect;
