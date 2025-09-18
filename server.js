const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./src/connection/mongodb.connection");
const userRoutes = require("./src/routes/users.route");
const profileRoutes = require("./src/routes/profile.route");
const paymentRoutes = require("./src/routes/payment.route");
const furnitureRoutes = require("./src/routes/furniture.route");
require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/auth", userRoutes);
app.use("/profile", profileRoutes);
app.use("/payment", paymentRoutes);
app.use("/furniture", furnitureRoutes);

const port = 3000;
app.listen(port, () => {
  dbConnection(process.env.MONGODB_URL);
  console.log("Server is listening on port", port);
});
