const router = require('express').Router();
const snippetController = require('../controllers/snippet.controller');

router.post("/searchsnippet", snippetController.seachSnippet);
router.post("/deletesnippet", snippetController.deleteSnippet);
router.post("/addsnippet", snippetController.addSnippet);
router.get("/searchonesnippet/:id", snippetController.searchSnippetById);
router.patch("/editsnippet", snippetController.editSnippet);
router.get("/getallsnippets/:type", snippetController.getAllSnippets);
router.post("/filtersnippet", snippetController.filterSnippet);
router.get("/getallsnippestfortemplates", snippetController.getAllSnippetsForTemplates);
router.post("/archivesnippet", snippetController.archiveSnippet);
router.get("/getallsnippetsarchive/:type", snippetController.getAllSnippetsArchive);

module.exports = router;

