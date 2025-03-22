// //for db connect(connect)

// let mongoose = require("mongoose")
// let con_string = "mongodb+srv://dhanushkumar:JcEI%40398@wishlistcluster.o35k7.mongodb.net/?retryWrites=true&w=majority&appName=wishlistcluster"

// let dbconnect = ()=>{
//    try{ mongoose.connect(con_string, {})
// console.log("database is connected")}
//    catch(err){console.log(err)}
// }
// module.exports = dbconnect


// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const uri = "mongodb+srv://dhanushkumar:JcEI%40398@wishlistcluster.o35k7.mongodb.net/?retryWrites=true&w=majority&appName=wishlistcluster";
//     await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error("Database connection error:", error.message);
//     process.exit(1); // Exit on failure
//   }
// };

// module.exports = connectDB;

// let mongoose = require("mongoose")
// let con_string = "mongodb+srv://dhanushkumar:JcEI%40398@wishlistcluster.o35k7.mongodb.net/?retryWrites=true&w=majority&appName=wishlistcluster"

// let dbconnect = ()=>{
//    try{ mongoose.connect(con_string, {})
// console.log("database is connected")}
//    catch(err){console.log(err)}
// }
// module.exports = dbconnect

const mongoose = require('mongoose');

async function connectDatabase() {
  try {
    await mongoose.connect('mongodb+srv://dhanushkumar:JcEI%40398@wishlistcluster.o35k7.mongodb.net/wishlist?retryWrites=true&w=majority&appName=wishlistcluster'); // Update with your database name
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

async function closeConnection() {
  try {
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
}
