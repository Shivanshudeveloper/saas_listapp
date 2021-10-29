const Template_Model = require("../models/Templates");

const addtemplate = async (req, res) => {
  const formData = req.body;

  try {
    const newTemplate = new Template_Model({
      ...formData,
      tag: String(formData.tag).split(","),
    });
    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const addTemplateFromExcel = async (req, res) => {
  const finalData = req.body;

  finalData.map(async (data) => {
    try {
      const newTemplate = new Template_Model(data);
      await newTemplate.save();
    } catch (error) {
      res.status(409).json({message: error.message});
    }
  });
  res.status(201).json({message: "Templates Added"});
};

const searchOneTemplate = async (req, res) => {
  const {id: id} = req.params;
  const template = await Template_Model.find({_id: id});
  res.json(template);
};

const editTemplate = async (req, res) => {
  const formData = req.body;
  const template = await Template_Model.findOneAndUpdate(
    {_id: formData._id},
    {...formData, tag: formData.tag.split(",")},
    {
      new: true,
      useFindAndModify: false,
    }
  );
  res.json({message: "Template Edited"});
};

const addTagToTemplate = async (req, res) => {
  const {tag, selected, type} = req.body;

  const promiseArray = selected.map(async (each) => {
    return new Promise(async (resolve, reject) => {
      const template = await Template_Model.find({_id: each});
      await template[0].tag.push(tag);
      await Template_Model.findByIdAndUpdate(each, template[0], {
        new: true,
        useFindAndModify: false,
      });
      return resolve();
    });
  });
  Promise.all(promiseArray).then(async () => {
    try {
      const allTemplates = await Template_Model.find({type: type});
      res.status(201).json(allTemplates);
    } catch (error) {
      res.status(409).json({message: error.message});
    }
  });
};

const RemoveTagFromTemplate = async (req, res) => {
  const {tag, selected, type} = req.body;
  const promiseArray = selected.map(async (each) => {
    return new Promise(async (resolve, reject) => {
      const template = await Template_Model.find({_id: each});
      template[0].tag = template[0].tag.filter((t) => t !== String(tag));
      await Template_Model.findByIdAndUpdate(each, template[0], {
        new: true,
        useFindAndModify: false,
      });
      return resolve();
    });
  });
  Promise.all(promiseArray).then(async () => {
    try {
      const allTemplates = await Template_Model.find({type: type});
      res.status(201).json(allTemplates);
    } catch (error) {
      res.status(409).json({message: error.message});
    }
  });
};

const RemoveTagFromSnippet = async (req, res) => {
  const {tag, selected, type} = req.body;
  const promiseArray = selected.map(async (each) => {
    return new Promise(async (resolve, reject) => {
      const template = await Snippet_Model.find({_id: each});
      template[0].tag = template[0].tag.filter((t) => t !== String(tag));
      await Snippet_Model.findByIdAndUpdate(each, template[0], {
        new: true,
        useFindAndModify: false,
      });
      return resolve();
    });
  });
  Promise.all(promiseArray).then(async () => {
    try {
      const allTemplates = await Snippet_Model.find({type: type});
      res.status(201).json(allTemplates);
    } catch (error) {
      res.status(409).json({message: error.message});
    }
  });
};

const getAllTemplates = async (req, res) => {
  const {type: type} = req.params;
  try {
    const allTemplates = await Template_Model.find({
      type: type,
      archive: false,
    });
    res.status(201).json(allTemplates);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const searchTemplate = async (req, res) => {
  try {
    const {searchQuery: name, type, archivestatus} = req.body;
    const s1 = new RegExp(name, "i");
    const allTemplates = await Template_Model.find({
      $or: [{name: s1, type, archive: archivestatus}],
    });
    res.status(201).json(allTemplates);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const deleteTemplate = async (req, res) => {
  const selected = req.body;
  const promiseArray = selected.map(async (each) => {
    return new Promise(async (resolve, reject) => {
      await Template_Model.findByIdAndDelete(each);
      return resolve();
    });
  });
  Promise.all(promiseArray).then(async () => {
    try {
      res.status(200).json(selected);
    } catch (error) {
      res.status(409).json({message: error.message});
    }
  });
};

const filterTemplate = async (req, res) => {
  const {name, desc, tag, type} = req.body;
  try {
    const namer = new RegExp(name, "i");
    const descr = new RegExp(desc, "i");
    const templates = await Template_Model.find({
      $or: [{name: namer}, {subject: descr}, {tag: {$in: tag}}],
      type: type,
    });
    res.status(200).json(templates);
  } catch (error) {
    console.log(error);
  }
};

const getAllTemplatesArchives = async (req, res) => {
  const {type: type} = req.params;
  try {
    const allCompanies = await Template_Model.find({
      type: type,
      archive: true,
    });
    res.status(201).json(allCompanies);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const archiveTemplates = async (req, res) => {
  const selected = req.body;
  res.setHeader("Content-Type", "application/json");

  selected.map((s) => {
    Template_Model.findOne({_id: s})
      .then((data) => {
        let a = data.archive;
        Template_Model.findOneAndUpdate(
          {_id: s},
          {archive: !a},
          {useFindAndModify: false}
        )
          .then(() => {
            res.status(200).json("Added Archive");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
};

module.exports = {
  deleteTemplate,
  searchTemplate,
  getAllTemplates,
  RemoveTagFromTemplate,
  RemoveTagFromSnippet,
  addTagToTemplate,
  editTemplate,
  searchOneTemplate,
  searchTemplate,
  addtemplate,
  addTemplateFromExcel,
  filterTemplate,
  archiveTemplates,
  getAllTemplatesArchives
};
