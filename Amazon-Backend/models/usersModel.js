const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  carts: {
    products: [],
  },
  orders: [String],
  address: {
    type: String,
    required: true,
  },
  isDeleted: Boolean,
});

const userModel = mongoose.model("user", userSchema);

// const testProduct = new userModel({
//   name: "Yashwant Saini",
//   username: "yashwant7877",
//   address: "Hno 233, Gali no 89, Near Police Station, Pilibheet, UP",
// });
// OBJECT

// testProduct.save().then((res) => {
//   console.log("---------- Saved User ----------");
//   console.log(res);
// });
// SAVE

module.exports = userModel;
