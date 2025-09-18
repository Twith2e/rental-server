const express = require("express");
const router = express.Router();
const Furniture = require("../models/furniture.model");

// Get all furniture
router.get("/", async (req, res) => {
  try {
    const furniture = await Furniture.find();
    res.json(furniture);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching furniture", error: error.message });
  }
});

// Get furniture by category
router.get("/category/:category", async (req, res) => {
  try {
    const furniture = await Furniture.find({ category: req.params.category });
    res.json(furniture);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching furniture by category",
        error: error.message,
      });
  }
});

// Get furniture by ID
router.get("/:id", async (req, res) => {
  try {
    const furniture = await Furniture.findById(req.params.id);
    if (!furniture) {
      return res.status(404).json({ message: "Furniture not found" });
    }
    res.json(furniture);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching furniture", error: error.message });
  }
});

module.exports = router;
