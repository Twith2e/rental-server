const mongoose = require("mongoose");

const furnitureSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["living-room", "bedroom", "dining", "office", "outdoor"],
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Furniture = mongoose.model("Furniture", furnitureSchema);

module.exports = Furniture;
