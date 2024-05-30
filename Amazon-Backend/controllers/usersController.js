const userModel = require("../models/usersModel");

const getAllUsers = async (req, res) => {
  try {
    const data = await userModel.find();
    res.json({
      status: "success",
      results: 0,
      data: {
        users: data,
      },
    });
  } catch (err) {
    res.tatus(500);
    console.log(err.message);
    res.json({
      status: "fail",
      message: "Couldn't get users data!",
    });
  }
};

const addUser = async (req, res) => {
  try {
    const { _id, ...data } = await userModel.create(req.body);
    res.json({
      status: "success",
      results: 1,
      message: "User signed up successfully!",
      data,
    });
  } catch (err) {
    res.status(500);
    console.log(err.message, "oops! Couldn't signed you up!");
  }
};
const deleteUser = async (req, res) => {
  try {
    const reqId = req.params.id;
    const result = await productModel.findOneAndDelete({ _id: reqId });
    res.json({
      status: "success",
      results: 1,
      message: "User Account Deleted successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500);
    console.log(err.message);
    res.json({
      status: "fail",
      message: "Cannot Delete User!",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const reqId = req.params.id;
    const data = req.body;
    const result = await productModel.findOneAndUpdate({ _id: reqId }, data);
    res.json({
      status: "success",
      results: 1,
      message: "Product successfully Updated!",
      data: result,
    });
  } catch (err) {
    res.status(500);
    console.log(err.message, "You missed this!");
    res.json({
      status: "fail",
      message: "Couldn't Update! Record not exits!",
    });
  }
};
module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
};
