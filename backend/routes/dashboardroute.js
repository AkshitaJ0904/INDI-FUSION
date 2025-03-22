const express = require("express");
const Dashboard = require("../model/dashboardmodel");

const router = express.Router();

// Add Dashboard Data
router.post("/add-dashboard-data", async (req, res) => {
  // Your existing route code
});

// Get All Dashboard Data
router.get("/get-dashboard-data", async (req, res) => {
  // Your existing route code
});

// Delete Dashboard Data
router.delete("/delete-dashboard-data/:id", async (req, res) => {
  // Your existing route code
});

module.exports = router;