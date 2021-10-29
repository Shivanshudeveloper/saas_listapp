const express = require("express");
const router = express.Router();
const companyController = require('../controllers/company.controller');

router.get("/getcompany/:id", companyController.getCompanyById);
router.delete("/deletecompany/:id", companyController.deleteCompanyById);
router.patch("/editcompany", companyController.editCompany);
router.post("/filtercompany", companyController.filterCompany);
router.post("/searchcompany", companyController.searchCompany);
router.post("/addcompany", companyController.addCompany);
router.get("/getallcompanies", companyController.getAllCompanies);

module.exports = router;
