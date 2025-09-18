const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
    },
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: "2d" }
  );
};

module.exports = generateAccessToken;
