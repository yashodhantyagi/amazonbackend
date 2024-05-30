const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
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
  paymentType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: new Date(), // default value
  },
});
// SCHEMA

// const productModel = mongoose.model("products", productSchema); either product or products both will work
const orderModel = mongoose.model("order", orderSchema);
// MODEL

// const testProduct = new orderModel({
//   title: "Titan Watch",
//   price: 1000,
// });
// OBJECT

// testProduct.save().then((res) => {
//   console.log("---------- Saved product ----------");
//   console.log(res);
// });
// SAVE

module.exports = orderModel;
