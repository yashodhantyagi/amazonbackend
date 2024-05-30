const express = require("express");
const usersController = require("../controllers/usersController");
const userRouter = express.Router();

userRouter
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.addUser);

userRouter
  .route("/:id")
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = userRouter;
