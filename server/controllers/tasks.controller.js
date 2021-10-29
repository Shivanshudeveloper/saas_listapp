const Task_Model = require('../models/Task');

const saveTasks = async (req, res) => {
  const {formData, option, value} = req.body;
  switch (value) {
    case 0:
      const newTask0 = new Task_Model({
        contact: formData.contact0,
        notes: formData.notes0,
        date: formData.date0,
        type: option,
        completed: false,
        value,
      });
      try {
        await newTask0.save();
        res.status(201).json(newTask0);
      } catch (error) {
        res.status(409).json({message: error.message});
      }
      break;
    case 1:
      const newTask1 = new Task_Model({
        contact: formData.contact1,
        notes: formData.notes1,
        result: formData.result1,
        date: formData.date1,
        type: option,
        completed: false,
        value,
      });
      try {
        await newTask1.save();
        res.status(201).json(newTask1);
      } catch (error) {
        res.status(409).json({message: error.message});
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
        res.status(409).json({message: error.message});
      }
      break;
    case 3:
      console.log(formData.date3);
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
        res.status(409).json({message: error.message});
      }
      break;
  }
};

const editTask = async (req, res) => {
  const {formData, option, value} = req.body;
  try {
    if (value === 0) {
      await Task_Model.findByIdAndUpdate(
        formData.id,
        {
          contact: formData.contact0,
          notes: formData.notes0,
          date: formData.date0,
          type: option,
          completed: false,
          value,
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
    }
    if (value === 1) {
      await Task_Model.findByIdAndUpdate(
        formData.id,
        {
          contact: formData.contact1,
          notes: formData.notes1,
          result: formData.result1,
          date: formData.date1,
          type: option,
          completed: false,
          value,
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
    }
    if (value === 2) {
      await Task_Model.findByIdAndUpdate(
        formData.id,
        {
          contact: formData.contact2,
          description: formData.desc2,
          date: formData.date2,
          type: option,
          completed: false,
          value,
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
    }
    if (value === 3) {
      await Task_Model.findByIdAndUpdate(
        formData.id,
        {
          contact: formData.contact3,
          description: formData.desc3,
          date: formData.date3,
          action: formData.action3,
          type: option,
          completed: false,
          value,
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
    }
    res.status(201).json({message: "Updated"});
  } catch (error) {
    console.log(error);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task_Model.find().sort({date: -1});
    res.status(201).json(allTasks);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const getSpecificTasks = async (req, res) => {
  const {type, status} = req.params;
  let flag;
  if (status === "completed") flag = true;
  else flag = false;
  try {
    const allTasks = await Task_Model.find({
      type: type,
      completed: flag,
    }).sort({date: -1});
    res.status(201).json(allTasks);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const getComingTasks = async (req, res) => {
  newDate = new Date();
  try {
    const allTasks = await Task_Model.find({completed: false}).sort({
      date: -1,
    });
    res.status(201).json(allTasks);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const getCompletedTasks = async (req, res) => {
  try {
    const allTasks = await Task_Model.find({completed: true}).sort({
      date: -1,
    });
    res.status(201).json(allTasks);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const deleteTaskById = async (req, res) => {
  const {id: id} = req.params;
  const task = await Task_Model.findByIdAndDelete(id);
  res.json(task);
};

const completeTask = async (req, res) => {
  try {
    const {id: id} = req.params;
    const updatedTask = await Task_Model.findOneAndUpdate(
      {_id: id},
      {completed: true},
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.json(updatedTask);
  } catch (error) {
    console.log(error);
  }
};

const notCompleteTaskById = async (req, res) => {
  try {
    const {id: id} = req.params;
    const updatedTask = await Task_Model.findOneAndUpdate(
      {_id: id},
      {completed: false},
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.json(updatedTask);
  } catch (error) {
    console.log(error);
  }
};

const searchTasks = async (req, res) => {
  const {contact, type, status} = req.body;
  try {
    const contactr = new RegExp(contact, "i");
    const typer = new RegExp(type, "i");
    const newStatus =
      status === "none"
        ? null
        : status.toUpperCase() === "COMPLETED"
        ? true
        : false;

    const tasks = await Task_Model.find({
      $or: [{contact: contactr}, {type: typer}, {completed: newStatus}],
    });
    res.status(200).json(tasks);
    // console.log(tasks);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  notCompleteTaskById,
  completeTask,
  getCompletedTasks,
  deleteTaskById,
  getComingTasks,
  getSpecificTasks,
  getAllTasks,
  saveTasks,
  searchTasks,
  editTask,
};
