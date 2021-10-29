const Products_Model = require("../models/Products");

// Database CRUD Operations
// @POST Request to GET the People
// GET
const getAllProducts = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  Products_Model.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Database CRUD Operations
// @POST Request to GET the People
// GET
const getAllProductsMainStore = async (req, res) => {
  const {filter} = req.params;
  res.setHeader("Content-Type", "application/json");
  MainStore_Model.find({gender: filter})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Database CRUD Operations
// @POST Request to GET the Product Details
// GET
const getProductItemDetails = async (req, res) => {
  const {id} = req.params;
  res.setHeader("Content-Type", "application/json");
  MainStore_Model.find({_id: id})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Database CRUD Operations
// @POST Request to GET the People
// GET
const getAllProductsFilters = async (req, res) => {
  const {filter} = req.params;
  res.setHeader("Content-Type", "application/json");
  Products_Model.find({Gender: filter})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Database CRUD Operations
// @POST Request to GET the People
// GET
const getCartItems = async (req, res) => {
  const {userId} = req.params;
  res.setHeader("Content-Type", "application/json");
  Cart_Model.find({userId, completed: false, payment: false, inCart: true})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Database CRUD Operations
// @POST Request to GET the People
// GET
const trackAllItems = async (req, res) => {
  const {userId} = req.params;
  res.setHeader("Content-Type", "application/json");
  Cart_Model.find({userId, completed: false, payment: true})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Database CRUD Operations
// @POST Request to GET the People
// GET
const getProductDetails = async (req, res) => {
  const {ParentCategory, Category, Brand} = req.params;
  res.setHeader("Content-Type", "application/json");
  Products_Model.find({ParentCategory, Category, Brand})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

module.exports = {
  getProductDetails,
  trackAllItems,
  getCartItems,
  getAllProductsFilters,
  getProductItemDetails,
  getAllProducts,
  getAllProductsMainStore,
};
