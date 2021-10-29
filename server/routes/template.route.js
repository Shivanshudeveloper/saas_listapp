const router = require('express').Router();
const templateController = require('../controllers/template.controller');

router.post("/addtemplate", templateController.addtemplate);
router.post("/addtemplatefromexcel", templateController.addTemplateFromExcel);
router.get("/searchonetemplate/:id", templateController.searchOneTemplate);
router.patch("/edittemplate", templateController.editTemplate);
router.patch("/addtagtotemplate", templateController.addTagToTemplate);
router.patch("/removetagfromtemplate", templateController.RemoveTagFromTemplate);
router.patch("/addtagtosnippet", templateController.add);
router.patch("/removetagfromsnippet", templateController.RemoveTagFromSnippet);
router.get("/getalltemplates/:type", templateController.getAllTemplates);
router.post("/searchtemplate", templateController.searchTemplate);
router.post("/deletetemplate", templateController.deleteTemplate);
router.post("/filtertemplate", templateController.filterTemplate);
router.get("/getalltemplatesarchive/:type", templateController.getAllTemplatesArchives);
router.post("/archivetemplates", templateController.archiveTemplates);

module.exports = router;
