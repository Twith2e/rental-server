const userModel = require("../models/users.model");
const profileModel = require("../models/profile.model");

const getProfile = async (req, res) => {
  try {
    const { email } = req.user;
    console.log("email:", email);
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Get user preferences
    const preferences = await profileModel.findOne({ email });

    const data = {
      email: user.email,
      name: user.name,
      preferences: preferences
        ? {
            preferences: preferences.preferences,
            monthly_budget: preferences.monthly_budget,
            apartment_size: preferences.apartment_size,
          }
        : null,
    };

    console.log("user:", user);
    return res.status(200).json({ message: "User found", success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const savePreferences = async (req, res) => {
  try {
    const { preferences, monthly_budget, apartment_size } = req.body;
    if (!preferences || !monthly_budget || !apartment_size)
      return res
        .status(400)
        .json({ message: "Missing parameter", success: false });
    const { email } = req.user;
    const payload = { preferences, monthly_budget, apartment_size, email };
    const saved = await profileModel.create(payload);
    if (!saved)
      return res
        .status(500)
        .json({ message: "Something went wrong, try again", success: false });
    return res
      .status(201)
      .json({ message: "Preferences saved successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error saving preferences",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { getProfile, savePreferences };
