const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/productsRoute");
const orderRouter = require("./routes/ordersRoute");
const userRouter = require("./routes/usersRoute");
const reviewRouter = require("./routes/reviewsRoute");

const app = express();
const test = require("./models/productsModel");

app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);

module.exports = app;
