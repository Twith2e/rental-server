const userModel = require("../models/users.model");
const bcrypt = require("bcryptjs");
const generateAccessToken = require("../utils/generateAccessToken");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Missing parameter", success: false });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already in use", success: false });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        success: false,
      });
    }

    const payload = { name, email, password };

    const newUser = await userModel.create(payload);
    if (!newUser)
      return res.status(500).json({
        message: "An error occured while creating user, try again",
        success: false,
      });
    const accessToken = generateAccessToken(newUser);
    if (!accessToken)
      return res.status(500).json({
        message:
          "An error occured while generating access token, please try again",
        success: false,
      });
    return res.status(201).json({
      message: "Registration complete",
      success: true,
      token: accessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Missing parameter", success: false });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }
    const accessToken = generateAccessToken(user);
    if (!accessToken) {
      return res.status(500).json({
        message:
          "An error occured while generating access token, please try again",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Login successful",
      success: true,
      token: accessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    if (req.cookies && req.cookies.token) {
      res.clearCookie("token");
    }
    return res.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { register, login, logout };
