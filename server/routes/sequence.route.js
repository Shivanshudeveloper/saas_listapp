const router = require('express').Router();
const sequenceController = require('../controllers/sequence.controller');

router.get("/getprospect/:id", sequenceController.getProspect);
router.post("/addprospect/:id", sequenceController.addProspect);
router.post("/newsequence", sequenceController.newSequence);
router.post("/addtasksequence", sequenceController.addTaskSequence);
router.get("/gettasksequence/:id", sequenceController.getTaskSequence);
router.delete("/deletesequence/:id", sequenceController.deleteSequence);
router.get("/getallsequence", sequenceController.getallsequence);
router.post("/testsequence", sequenceController.testSequence);

module.exports = router;
