const router = require('express').Router();
const usercontroller = require('../controllers/userdetails.controller');

router.get("/getdetails/:id", usercontroller.getDetails);
router.post("/adddetails", usercontroller.addDetails);
router.post("/editdetails", usercontroller.editDetails);

module.exports = router;
