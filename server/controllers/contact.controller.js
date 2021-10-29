const Contact_Model = require('../models/Contact');

const addContact = async (req, res) => {
  const formData = req.body;
  const newContact = new Contact_Model({
    ...formData,
  });

  try {
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const editContact = async (req, res) => {
  const formData = req.body;
  try {
    await Contact_Model.findByIdAndUpdate(formData._id, formData, {
      new: true,
      useFindAndModify: false,
    });
    res.status(201).json({message: "Updated"});
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const getAllContact = async (req, res) => {
  try {
    const allContacts = await Contact_Model.find({});
    res.status(201).json(allContacts);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const searchContact = async (req, res) => {
  try {
    const {searchQuery} = req.body;
    const s1 = new RegExp(searchQuery, "i");
    const allContacts = await Contact_Model.find({
      $or: [{fName: s1}, {lName: s1}],
    });
    res.status(201).json(allContacts);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const getContactById = async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id);
    const contact = await Contact_Model.find({_id: id});
    res.status(201).json(contact);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const deleteContactById = async (req, res) => {
  try {
    const {id} = req.params;
    await Contact_Model.findByIdAndDelete(id);
    res.status(201).json({message: "Deleted"});
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const filerContact = async (req, res) => {
    try {
      const {filterQuery} = req.body;
      const s1 = new RegExp(
        filterQuery.contact === "" ? "none" : filterQuery.contact,
        "i"
      );
      const s2 = new RegExp(
        filterQuery.company === "" ? "none" : filterQuery.company,
        "i"
      );
      const s3 = new RegExp(
        filterQuery.location === "" ? "none" : filterQuery.location,
        "i"
      );
      const allContacts = await Contact_Model.find({
        $or: [{fName: s1}, {lName: s1}, {company: s2}, {state: s3}],
      });
      res.status(201).json(allContacts);
    } catch (error) {
      res.status(409).json({message: error.message});
    }
}

module.exports = {
  addContact,
  editContact,
  getAllContact,
  searchContact,
  getContactById,
  deleteContactById,
  filerContact,
};
