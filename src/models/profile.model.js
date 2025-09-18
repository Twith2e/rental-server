const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  preferences: {
    type: String,
    trim: true,
  },
  monthly_budget: {
    type: Number,
  },
  apartment_size: {
    type: String,
    enum: ["small", "medium", "large"],
    trim: true,
  },
});

const profileModel = mongoose.model("Profile", profileSchema);

module.exports = profileModel;
