const router = require('express').Router();
const TaskModel = require('../models/Task');
const tasksController = require('../controllers/tasks.controller');

router.post("/searchtasks", tasksController.searchTasks);
router.post("/savetask", tasksController.saveTasks);
router.patch("/edittask", tasksController.editTask);
router.get("/getalltasks", tasksController.getAllTasks);
router.get("/getspecifictasks/:type/:status", tasksController.getSpecificTasks);
router.get("/getcomingtasks", tasksController.getComingTasks);
router.get("/getcompletedtasks", tasksController.getCompletedTasks);
router.delete("/deletetask/:id", tasksController.deleteTaskById);
router.patch("/completetask/:id", tasksController.completeTask.completeTask);
router.patch("/notcompletetask/:id", tasksController.notCompleteTaskById);

module.exports = router;
