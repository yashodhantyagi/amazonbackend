const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true, // built-in validators
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  categories: String,
  images: [String],
  discountPercentage: Number,
  createdAt: {
    type: Date,
    default: new Date(), // default value
  },
  updatedAt: {
    type: Date,
    default: new Date(), // default value
  },
  isDeleted: Boolean,
});
// SCHEMA

// const productModel = mongoose.model("products", productSchema); either product or products both will work
const productModel = mongoose.model("product", productSchema);
// MODEL

// const testProduct = new productModel({
//   title: "Titan Watch",
//   price: 1000,
// });
// OBJECT

// testProduct.save().then((res) => {
//   console.log("---------- Saved product ----------");
//   console.log(res);
// });
// SAVE

module.exports = productModel;
