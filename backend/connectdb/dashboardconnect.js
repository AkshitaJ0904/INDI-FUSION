const mongoose = require("mongoose");

// MongoDB connection string
let con_string = "mongodb+srv://dhanushkumar:<JcEI%40398>@wishlistcluster.o35k7.mongodb.net/myDatabaseName?retryWrites=true&w=majority&appName=wishlistcluster";

let dbconnect = async () => {
   try {
      await mongoose.connect(con_string);
      console.log("Database is connected successfully");
   } catch (err) {
      console.error("Database connection error:", err);  // Debug log
   }
};

module.exports = dbconnect;
