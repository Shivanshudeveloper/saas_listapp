const router = require("express").Router();
const tagsController = require("../controllers/tags.controller");

router.get("/getalltags", tagsController.getAllTags);
router.get("/getalltagstemplates", tagsController.getAllTagTemplates);

module.exports = router;