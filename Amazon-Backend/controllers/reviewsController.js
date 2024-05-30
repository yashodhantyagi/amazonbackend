const reviewModel = require("../models/reviewsModel");
const getAllReviews = async (req, res) => {
  try {
    const { rating = 5, page = 1, pageSize = 2, fields = "", ...q } = req.query;
    const fieldsString = fields.split(",").join(" ");

    let query = reviewModel.find(q);
    const SKIP = pageSize * (page - 1);
    query = query.skip(SKIP).limit(pageSize);
    query = query.select(fieldsString);

    const reviews = await query;
    const totalResults = await reviewModel.countDocuments();

    res.json({
      status: "success",
      results: reviews.length,
      data: {
        reviews,
      },
      totalResults,
      pageSize,
      page,
    });
  } catch (err) {
    res.status(500);
    console.log("Error: ", err.message);
    res.json({
      status: "fail",
      message: "couldn't get all the reviews!",
    });
  }
};
const addReview = async (req, res) => {
  try {
    const { _id, ...data } = await reviewModel.create(req, res);
    res.json({
      status: "success",
      results: 1,
      message: "Review Added successfully!",
      data: data,
    });
  } catch (err) {
    res.status(500);
    console.log("Error: ", err.message);
    res.json({
      status: "fail",
      message: "Review not added!",
    });
  }
};
const updateReview = async (req, res) => {
  try {
    const reqId = req.params.id;
    const data = req.body;
    const result = await reviewModel.findOneAndUpdate({ _id: reqId }, data);
    res.json({
      status: "success",
      results: 1,
      message: "Review successfully Updated!",
      data: result,
    });
  } catch (err) {
    res.status(500);
    console.log("Error: ", err.message);
    res.json({
      status: "fail",
      message: "couldn't update review!",
    });
  }
};
const deleteReview = async (req, res) => {
  try {
    const reqId = req.params.id;
    const result = await productModel.findOneAndDelete({ _id: reqId });
    res.json({
      status: "success",
      results: 1,
      message: "Successfully deleted the review!",
      data: result,
    });
  } catch (err) {
    res.status(500);
    console.log("Error: ", err.message);
    res.json({
      status: "fail",
      message: "couldn't delete review!",
    });
  }
};

module.exports = {
  getAllReviews,
  addReview,
  updateReview,
  deleteReview,
};
