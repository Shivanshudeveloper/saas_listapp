const User_Model = require("../models/Users");

const getDetails = async (req, res) => {
  const {id} = req.params;
  try {
    const userDetails = await User_Model.find({userId: id});
    res.status(201).json(userDetails);
  } catch (error) {
    console.log(error);
    res.status(409).json({message: error.message});
  }
};

const addDetails = async (req, res) => {
  const formData = req.body;
  try {
    const newUser = new User_Model(formData);
    await newUser.save();
    res.status(201).json({message: newUser});
  } catch (error) {
    console.log(error);
    res.status(409).json({message: error.message});
  }
};

const editDetails = async (req, res) => {
  const formData = req.body;
  try {
    const newUser = await User_Model.findByIdAndUpdate(
      {_id: formData._id},
      formData,
      {useFindAndModify: false}
    );
    res.status(201).json({message: newUser});
  } catch (error) {
    console.log(error);
    res.status(409).json({message: error.message});
  }
};

module.exports = {
  addDetails,
  editDetails,
  getDetails,
};
