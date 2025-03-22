const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
let dbconnect = require("C:\Users\Dhanush\OneDrive\Desktop\indifusion\backend\connectdb\dashboardconnect.js");

const Dashboard = require(".model/dashboardmodel");  

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to Database
dbconnect();

// Routes
// Add Dashboard Data
app.post("/add-dashboard-data", async (req , res) => {
    console.log("Received request at /add-dashboard-data");
    console.log("Request body:", req.body);  // Debug log
    try {
       const newData = new Dashboard(req.body);
       const savedData = await newData.save();
       console.log("Data saved successfully:", savedData);  // Log the saved data
       res.status(201).send("Dashboard data saved successfully!");
    } catch (error) {
       console.error("Error saving data:", error);  // Debug log
       res.status(500).send("Error saving data: " + error.message);
    }
 });

// Get All Dashboard Data
app.get("/get-dashboard-data", async (req, res) => {
   try {
      const data = await Dashboard.find();
      res.status(200).json(data);
   } catch (error) {
      console.error("Error fetching data:", error);  // Debug log
      res.status(500).send("Error fetching data: " + error.message);
   }
});


// Delete Dashboard Data
app.delete("/delete-dashboard-data/:id", async (req, res) => {
    try {
       const { id } = req.params;
       await Dashboard.findByIdAndDelete(id);
       res.status(200).send("Dashboard data deleted successfully!");
    } catch (error) {
       res.status(500).send("Error deleting data: " + error.message);
    }
 });
 

app.listen(3000, () => {
   console.log("Server is connected on port 3000");
});
