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
const Template_Model = require("../models/Templates");
const Snippet_Model = require("../models/Snippet");
const Task_Model = require("../models/Task");

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

router.post("/savetask", async (req, res) => {
  const { formData, option, value } = req.body;
  switch (value) {
    case 0:
      const newTask0 = new Task_Model({
        contact: formData.contact0,
        notes: formData.notes0,
        type: option,
        completed: false,
        value,
      });
      try {
        await newTask0.save();
        res.status(201).json(newTask0);
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
      break;
    case 1:
      const newTask1 = new Task_Model({
        contact: formData.contact1,
        notes: formData.notes1,
        result: formData.result1,
        type: option,
        completed: false,
        value,
      });
      try {
        await newTask1.save();
        res.status(201).json(newTask1);
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
      break;
    case 2:
      const newTask2 = new Task_Model({
        contact: formData.contact2,
        description: formData.desc2,
        date: formData.date2,
        type: option,
        completed: false,
        value,
      });
      try {
        await newTask2.save();
        res.status(201).json(newTask2);
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
      break;
    case 3:
      const newTask3 = new Task_Model({
        contact: formData.contact3,
        description: formData.desc3,
        date: formData.date3,
        action: formData.action3,
        type: option,
        completed: false,
        value,
      });
      try {
        await newTask3.save();
        res.status(201).json(newTask3);
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
      break;
  }
});

router.patch("/edittask", async (req, res) => {
  const { formData, value } = req.body;
  switch (value) {
    case 0:
      const newTask0 = await Task_Model.findOneAndUpdate(
        { _id: formData._id },
        {
          contact: formData.contact0,
          notes: formData.notes0,
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      console.log(newTask0);
      break;
    case 1:
      const newTask1 = await Task_Model.findOneAndUpdate(
        { _id: formData._id },
        {
          contact: formData.contact1,
          notes: formData.notes1,
          result: formData.result1,
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      break;
    case 2:
      const newTask2 = await Task_Model.findOneAndUpdate(
        { _id: formData._id },
        {
          contact: formData.contact2,
          description: formData.desc2,
          date: formData.date2,
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      break;
    case 3:
      const newTask3 = await Task_Model.findOneAndUpdate(
        { _id: formData._id },
        {
          contact: formData.contact3,
          description: formData.desc3,
          date: formData.date3,
          action: formData.action3,
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      break;
  }
  res.status(201).json({ message: "Updated" });
});

router.get("/getalltasks", async (req, res) => {
  try {
    const allTasks = await Task_Model.find();
    res.status(201).json(allTasks);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.delete("/deletetask/:id", async (req, res) => {
  const { id: id } = req.params;
  const task = await Task_Model.findByIdAndDelete(id);
  res.json(task);
});

router.patch("/completetask/:id", async (req, res) => {
  try {
    const { id: id } = req.params;
    const updatedTask = await Task_Model.findOneAndUpdate(
      { _id: id },
      { completed: true },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.json(updatedTask);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addtemplate", async (req, res) => {
  const formData = req.body;
  const newTemplate = new Template_Model({
    ...formData,
    tag: formData.tag.split(","),
  });

  try {
    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.get("/searchonetemplate/:id", async (req, res) => {
  const { id: id } = req.params;
  const template = await Template_Model.find({ _id: id });
  res.json(template);
});

router.patch("/edittemplate", async (req, res) => {
  const formData = req.body;
  const template = await Template_Model.findOneAndUpdate(
    { _id: formData._id },
    { ...formData, tag: formData.tag.split(",") },
    {
      new: true,
      useFindAndModify: false,
    }
  );
  res.json({ message: "Template Edited" });
});

router.patch("/addtagtotemplate", async (req, res) => {
  const { tag, selected, type } = req.body;

  const promiseArray = selected.map(async (each) => {
    return new Promise(async (resolve, reject) => {
      const template = await Template_Model.find({ _id: each });
      await template[0].tag.push(tag);
      await Template_Model.findByIdAndUpdate(each, template[0], {
        new: true,
        useFindAndModify: false,
      });
      return resolve();
    });
  });
  Promise.all(promiseArray).then(async () => {
    try {
      const allTemplates = await Template_Model.find({ type: type });
      res.status(201).json(allTemplates);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  });
});

router.patch("/removetagfromtemplate", async (req, res) => {
  const { tag, selected, type } = req.body;
  const promiseArray = selected.map(async (each) => {
    return new Promise(async (resolve, reject) => {
      const template = await Template_Model.find({ _id: each });
      template[0].tag = template[0].tag.filter((t) => t !== String(tag));
      await Template_Model.findByIdAndUpdate(each, template[0], {
        new: true,
        useFindAndModify: false,
      });
      return resolve();
    });
  });
  Promise.all(promiseArray).then(async () => {
    try {
      const allTemplates = await Template_Model.find({ type: type });
      res.status(201).json(allTemplates);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  });
});

router.get("/getalltemplates/:type", async (req, res) => {
  const { type: type } = req.params;
  try {
    const allTemplates = await Template_Model.find({ type: type });
    res.status(201).json(allTemplates);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.post("/searchtemplate", async (req, res) => {
  try {
    const { searchQuery: name, type } = req.body;
    const allTemplates = await Template_Model.find({
      $or: [
        {
          name,
          type,
        },
      ],
    });
    res.status(201).json(allTemplates);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.delete("/deletetemplate/:id", async (req, res) => {
  const { id: _id } = req.params;
  await Template_Model.findByIdAndRemove(_id, { useFindAndModify: false });
});

// SNIPPETS

router.post("/searchsnippet", async (req, res) => {
  try {
    const { searchQuery: name, type } = req.body;
    const allSnippets = await Snippet_Model.find({
      $or: [
        {
          name,
          type,
        },
      ],
    });
    res.status(201).json(allSnippets);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.delete("/deletesnippet/:id", async (req, res) => {
  const { id: _id } = req.params;
  await Snippet_Model.findByIdAndRemove(_id, { useFindAndModify: false });
});

router.post("/addsnippet", async (req, res) => {
  const formData = req.body;
  const newSnippet = new Snippet_Model({
    ...formData,
    tag: formData.tag.split(","),
  });

  try {
    await newSnippet.save();
    res.status(201).json(newSnippet);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.get("/searchonesnippet/:id", async (req, res) => {
  const { id: id } = req.params;
  const snippet = await Snippet_Model.find({ _id: id });
  res.json(snippet);
});

router.patch("/editsnippet", async (req, res) => {
  const formData = req.body;
  const snippet = await Snippet_Model.findOneAndUpdate(
    { _id: formData._id },
    { ...formData, tag: formData.tag.split(",") },
    {
      new: true,
      useFindAndModify: false,
    }
  );
  res.json({ message: "Snippet Edited" });
});

router.get("/getallsnippets/:type", async (req, res) => {
  const { type: type } = req.params;
  try {
    const allCompanies = await Snippet_Model.find({ type: type });
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
