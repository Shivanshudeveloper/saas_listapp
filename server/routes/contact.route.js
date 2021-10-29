const express = require('express');
const router = express.Router();
const Contact_Model = require('../models/Contact');
const contactController = require('../controllers/contact.controller');

router.post("/addcontact", contactController.addContact);
router.patch("/editcontact", contactController.editContact);
router.get("/getallcontact", contactController.getAllContact);
router.post("/searchcontact", contactController.searchContact);
router.get("/getcontact/:id", contactController.getContactById);
router.post("/filtercontact", contactController.filerContact);
router.delete("/deletecontact/:id", contactController.deleteContactById);

module.exports = router;