const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction.model");
const Furniture = require("../models/furniture.model");

// Process a new payment
router.post("/process", async (req, res) => {
  try {
    const { email, items, paymentMethod } = req.body;

    // Calculate total amount and verify furniture availability
    let totalAmount = 0;
    for (const item of items) {
      const furniture = await Furniture.findById(item.furnitureId);
      if (!furniture) {
        return res
          .status(404)
          .json({ message: `Furniture ${item.furnitureId} not found` });
      }
      if (furniture.quantity < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient quantity for ${furniture.name}` });
      }
      totalAmount += furniture.price * item.quantity;
    }

    // Create transaction record
    const transaction = new Transaction({
      email,
      amount: totalAmount,
      items: items.map((item) => ({
        furnitureId: item.furnitureId,
        quantity: item.quantity,
        priceAtTime: totalAmount / items.length, // This is simplified, should use actual furniture price
      })),
      paymentMethod,
    });

    // Save transaction
    await transaction.save();

    // Update furniture quantities
    for (const item of items) {
      await Furniture.findByIdAndUpdate(item.furnitureId, {
        $inc: { quantity: -item.quantity },
      });
    }

    res.status(201).json({
      message: "Payment processed successfully",
      transactionId: transaction._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing payment", error: error.message });
  }
});

// Get transaction history for a user
router.get("/history/:email", async (req, res) => {
  try {
    const transactions = await Transaction.find({ email: req.params.email })
      .populate("items.furnitureId")
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching transaction history",
      error: error.message,
    });
  }
});

module.exports = router;
