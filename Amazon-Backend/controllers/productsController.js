const productModel = require("../models/productsModel");
const getAllProducts = async (req, res) => {
  try {
    // We use spread operator to separate sort function from being the object to be checked for its value.
    const {
      sort = "price",
      page = 1,
      pageSize = 2,
      fields = "", // -info will exclude info part
      ...q
    } = req.query; // queries in the queryString
    const sortString = sort.split(",").join(" ");
    const fieldsString = fields.split(",").join(" ");

    // CREATING QUERY
    let query = productModel.find(q); // Query is Created such as SELECT * from ...

    // similarly, as for sorting you can use -(minus) here to unselect or exclude
    // query = query.find(q);
    // filters included such as WHERE price = 1000
    // Sorting HARDCODED
    // query = query.sort("price -title");

    // Dynamic way of sorting
    query = query.sort(sortString);

    // PAGINATION
    const SKIP = pageSize * (page - 1); // Skips or offsets
    // const LIMIT = pageSize; // limitation of records to show on a page
    query = query.skip(SKIP).limit(pageSize);
    query = query.select(fieldsString);

    // REQUESTING QUERY FROM DATABASE
    const products = await query;

    const totalResults = await productModel.countDocuments();

    res.json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
      totalResults,
      pageSize,
      page,
    });
  } catch (err) {
    console.log(err.message);
  }
};

const addProduct = async (req, res) => {
  // Instead of validating here, it is better to equip schema to use built-in validation
  // use exception handling here
  try {
    const { _id, ...data } = await productModel.create(req.body);
    res.json({
      status: "success",
      results: 1,
      message: "Product successfully added!",
      data: data,
    });
  } catch (err) {
    res.status(500);
    console.log(err.message, "Oops! You missed out some details!");
    res.json({
      status: "fail",
      message: "Price or Title missing",
    });
  }
};

const updateProduct = async (req, res) => {
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

const replaceProduct = async (req, res) => {
  try {
    const reqId = req.params.id;
    const data = { ...req.body, _id: reqId };
    const result = await productModel.findOneAndReplace({ _id: reqId }, data);
    res.json({
      status: "success",
      results: 0,
      message: "Successfully replaced the product",
      data: result,
    });
  } catch (err) {
    res.status(500);
    console.log(err.message, "You missed this!");
    res.json({
      status: "fail",
      message: "Couldn't find record to replace!",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const reqId = req.params.id;
    const result = await productModel.findOneAndDelete({ _id: reqId });
    res.json({
      status: "success",
      results: 1,
      message: "Successfully deleted the product!",
      data: result,
    });
  } catch (err) {
    res.status(500);
    console.log(err.message, "Product Not exists!");
    res.json({
      status: "fail",
      message: "Couldn't find record to delete!",
    });
  }
};
module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  replaceProduct,
  deleteProduct,
};
