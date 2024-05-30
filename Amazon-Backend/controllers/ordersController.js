const orderModel = require("../models/ordersModel");
// const getAllOrders = async (req, res) => {
//   try {
//     const data = await orderModel.find();
//     res.json({
//       status: "success",
//       results: 0,
//       data: {
//         products: data,
//       },
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// const addProduct = async (req, res) => {
//   // Instead of validating here, it is better to equip schema to use built-in validation
//   // use exception handling here
//   try {
//     const { _id, ...data } = await productModel.create(req.body);
//     res.json({
//       status: "success",
//       results: 0,
//       message: "Product successfully added!",
//       data: data,
//     });
//   } catch (err) {
//     res.status(500);
//     console.log(err.message, "Oops! You missed out some details!");
//     res.json({
//       status: "fail",
//       message: "Price or Title missing",
//     });
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const reqId = req.params.id;
//     const data = req.body;
//     const result = await productModel.findOneAndUpdate({ _id: reqId }, data);
//     res.json({
//       status: "success",
//       results: 0,
//       message: "Product successfully Updated!",
//       data: result,
//     });
//   } catch (err) {
//     res.status(500);
//     console.log(err.message, "You missed this!");
//     res.json({
//       status: "fail",
//       message: "Couldn't Update! Record not exits!",
//     });
//   }
// };

// const replaceProduct = async (req, res) => {
//   try {
//     const reqId = req.params.id;
//     const data = { ...req.body, _id: reqId };
//     const result = await productModel.findOneAndReplace({ _id: reqId }, data);
//     res.json({
//       status: "success",
//       results: 0,
//       message: "Successfully replaced the product",
//       data: result,
//     });
//   } catch (err) {
//     res.status(500);
//     console.log(err.message, "You missed this!");
//     res.json({
//       status: "fail",
//       message: "Couldn't find record to replace!",
//     });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     const reqId = req.params.id;
//     const result = await productModel.findOneAndDelete({ _id: reqId });
//     res.json({
//       status: "success",
//       results: 0,
//       message: "Successfully deleted the product!",
//       data: result,
//     });
//   } catch (err) {
//     res.status(500);
//     console.log(err.message, "Product Not exists!");
//     res.json({
//       status: "fail",
//       message: "Couldn't find record to delete!",
//     });
//   }
// };
// module.exports = {
//   getAllProducts,
//   addProduct,
//   updateProduct,
//   replaceProduct,
//   deleteProduct,
// };

const getAllOrders = async (req, res) => {
  try {
    const {
      sort = "price",
      page = 1,
      pageSize = 2,
      fields = "",
      ...q
    } = req.query;
    const sortString = sort.split(",").join(" ");
    const fieldsString = fields.split(",").join(" ");

    let query = orderModel.find(q);
    query = query.sort(sortString);

    const SKIP = pageSize * (page - 1);

    query = query.skip(SKIP).limit(pageSize);
    query = query.select(fieldsString);

    const orders = await query;
    const totalResults = await orderModel.countDocuments();
    res.json({
      status: "success",
      results: orders.length,
      data: {
        orders,
      },
      totalResults,
      pageSize,
      page,
      message: "Successfully fetched all orders",
    });
  } catch (err) {
    console.log(err.message);
    res.json({});
  }
};

const placeOrder = async (req, res) => {
  try {
    const { _id, ...data } = await orderModel.create(req.body);
    res.json({
      status: "success",
      results: 1,
      message: "order placed successfully!",
      data: data,
    });
  } catch (err) {
    res.status(500);
    // console.log(err.message, "Oops! You missed out some details!");
    res.json({
      status: "fail",
      message: "Oops! Something unexpected occur!",
    });
  }
};
const updateOrder = async (req, res) => {
  try {
    const reqId = req.params.id;
    const data = req.body;
    const result = await orderModel.findOneAndUpdate({ _id: reqId }, data);
    res.json({
      status: "success",
      results: 1,
      message: "order updated successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500);
    // console.log(err.message, "You missed this!");
    res.json({
      status: "fail",
      message: "Couldn't Update! You missed the timeline!",
    });
  }
};
const replaceOrder = async (req, res) => {
  try {
    const reqId = req.params.id;
    const data = { ...req.body, _id: reqId };
    const result = await orderModel.findOneAndReplace({ _id: reqId }, data);
    res.json({
      status: "success",
      results: 0,
      message: "Order replaced successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500);
    // console.log(err.message, "You missed this!");
    res.json({
      status: "fail",
      message: "Couldn't replace!",
    });
  }
};
const cancelOrder = async (req, res) => {
  try {
    const reqId = req.params.id;
    const result = await orderModel.findOneAndDelete({ _id: reqId });
    res.json({
      status: "success",
      results: 1,
      message: "Order cancelled successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500);
    // console.log(err.message, "order Not exists!");
    res.json({
      status: "fail",
      message: "Couldn't cancel order!",
    });
  }
};

module.exports = {
  getAllOrders,
  placeOrder, // addOrder or postOrder
  updateOrder,
  replaceOrder,
  cancelOrder, // deleteOrder
};
