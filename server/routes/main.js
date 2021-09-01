const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51IdwfeH8KzFo5uc9YHKzp2HOPkZJvH0ij0qhWeg0wQ17G73o5fVJYjMkWOfAmWUgjVZe0DesJvrQKbmAPSacXsVP00qMXnEqFr"
);
const { v4: uuidv4 } = require("uuid");
// Getting Module

const Products_Model = require("../models/Products");
const MainStore_Model = require("../models/MainStore");
const Cart_Model = require("../models/Cart");
const Contact_Model = require("../models/Contact");
const Company_Model = require("../models/Company");

function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

//
router.post("/addcontact", async (req, res) => {
  const formData = req.body;
  const newContact = new Contact_Model({
    ...formData,
  });

  try {
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.get("/getallcontact", async (req, res) => {
  try {
    const allContacts = await Contact_Model.find({});
    res.status(201).json(allContacts);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.post("/addcompany", async (req, res) => {
  const formData = req.body;
  const newCompany = new Company_Model({
    ...formData,
  });

  try {
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.get("/getallcompanies", async (req, res) => {
  try {
    const allCompanies = await Company_Model.find({});
    res.status(201).json(allCompanies);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

// TEST
// @GET TEST
// GET
router.get("/test", (req, res) => {
  res.send("Working");
});

// Database CRUD Operations
// @POST Request to GET the People
// GET
router.get("/getallproductapi", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  Products_Model.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Database CRUD Operations
// @POST Request to GET the People
// GET
router.get("/getallproductsmainstorefilters/:filter", (req, res) => {
  const { filter } = req.params;
  res.setHeader("Content-Type", "application/json");
  MainStore_Model.find({ gender: filter })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Database CRUD Operations
// @POST Request to GET the Product Details
// GET
router.get("/getproductitemdetails/:id", (req, res) => {
  const { id } = req.params;
  res.setHeader("Content-Type", "application/json");
  MainStore_Model.find({ _id: id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Database CRUD Operations
// @POST Request to GET the People
// GET
router.get("/getallproductsapifilters/:filter", (req, res) => {
  const { filter } = req.params;
  res.setHeader("Content-Type", "application/json");
  Products_Model.find({ Gender: filter })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Database CRUD Operations
// @POST Request to GET the People
// GET
router.get("/getcartallitems/:userId", (req, res) => {
  const { userId } = req.params;
  res.setHeader("Content-Type", "application/json");
  Cart_Model.find({ userId, completed: false, payment: false, inCart: true })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Database CRUD Operations
// @POST Request to GET the People
// GET
router.get("/gettrackallitems/:userId", (req, res) => {
  const { userId } = req.params;
  res.setHeader("Content-Type", "application/json");
  Cart_Model.find({ userId, completed: false, payment: true })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Database CRUD Operations
// @POST Request to GET the People
// GET
router.get(
  "/getallproductapicategory/:ParentCategory/:Category/:Brand",
  (req, res) => {
    const { ParentCategory, Category, Brand } = req.params;
    res.setHeader("Content-Type", "application/json");
    Products_Model.find({ ParentCategory, Category, Brand })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => res.status(400).json(`Error: ${err}`));
  }
);

module.exports = router;
