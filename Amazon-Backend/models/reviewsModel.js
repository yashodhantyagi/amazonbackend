const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  images: [String],
  videos: [String],
  headline: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  productId: {
    type: String,
  },
  isDeleted: Boolean,
});

const reviewModel = mongoose.model("review", reviewSchema);

// const testProduct = new reviewModel({
//   title: "Titan Watch",
//   price: 1000,
// });
// OBJECT

// testProduct.save().then((res) => {
//   console.log("---------- Saved Review ----------");
//   console.log(res);
// });
// SAVE

module.exports = reviewModel;
