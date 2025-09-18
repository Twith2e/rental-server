const express = require("express");
const router = express.Router();

const {
  getProfile,
  savePreferences,
} = require("../controllers/profile.controller");

const authenticateUser = require("../utils/authenticateUser");

router.get("/", authenticateUser, getProfile);
router.post("/preferences", authenticateUser, savePreferences);

module.exports = router;
