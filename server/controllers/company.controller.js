const getCompanyById = async (req, res) => {
  try {
    const {id} = req.params;
    const company = await Company_Model.find({_id: id});
    res.status(201).json(company);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const deleteCompanyById = async (req, res) => {
  try {
    const {id} = req.params;
    await Company_Model.findByIdAndDelete(id);
    res.status(201).json({message: "Deleted"});
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const editCompany = async (req, res) => {
  const formData = req.body;
  try {
    await Company_Model.findByIdAndUpdate(formData._id, formData, {
      new: true,
      useFindAndModify: false,
    });
    res.status(201).json({message: "Updated"});
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const filterCompany = async (req, res) => {
  try {
    const {filterQuery} = req.body;
    console.log(filterQuery);
    const s1 = new RegExp(
      filterQuery.company === "" ? "none" : filterQuery.company,
      "i"
    );
    const s2 = new RegExp(
      filterQuery.industry === "" ? "none" : filterQuery.industry,
      "i"
    );
    const s3 = new RegExp(
      filterQuery.location === "" ? "none" : filterQuery.location,
      "i"
    );
    const s4 = new RegExp(
      filterQuery.technologies === "" ? "none" : filterQuery.technologies,
      "i"
    );
    const allCompanies = await Company_Model.find({
      $or: [{fullName: s1}, {industry: s2}, {state: s3}, {about: s4}],
    });
    res.status(201).json(allCompanies);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const searchCompany = async (req, res) => {
  try {
    const {searchQuery} = req.body;
    const s1 = new RegExp(searchQuery, "i");
    const allCompany = await Company_Model.find({
      $or: [{fullName: s1}],
    });
    res.status(201).json(allCompany);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const addCompany = async (req, res) => {
  const formData = req.body;
  const newCompany = new Company_Model({
    ...formData,
  });

  try {
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const allCompanies = await Company_Model.find({});
    res.status(201).json(allCompanies);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

module.exports = {
  getCompanyById,
  deleteCompanyById,
  editCompany,
  filterCompany,
  searchCompany,
  addCompany,
  getAllCompanies
};
