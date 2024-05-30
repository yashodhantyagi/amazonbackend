const express = require("express");
const ordersController = require("../controllers/ordersController");
const orderRouter = express.Router();

orderRouter
  .route("/")
  .get(ordersController.getAllOrders)
  .post(ordersController.placeOrder);

orderRouter
  .route("/:id")
  .put(ordersController.replaceOrder)
  .patch(ordersController.updateOrder)
  .delete(ordersController.cancelOrder);

module.exports = orderRouter;
