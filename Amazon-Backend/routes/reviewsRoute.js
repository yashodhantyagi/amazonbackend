const express = require("express");
const reviewsController = require("../controllers/reviewsController");
const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .get(reviewsController.getAllReviews)
  .post(reviewsController.addReview);

reviewRouter
  .route("/:id")
  .patch(reviewsController.updateReview)
  .delete(reviewsController.deleteReview);

module.exports = reviewRouter;
