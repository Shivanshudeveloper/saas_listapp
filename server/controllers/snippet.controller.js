const Snippet_Model = require("../models/Snippet");

const seachSnippet = async (req, res) => {
  try {
    const {searchQuery: name, type} = req.body;
    const allSnippets = await Snippet_Model.find({
      $or: [
        {
          name,
          type,
        },
      ],
    });
    res.status(201).json(allSnippets);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const deleteSnippet = async (req, res) => {
  const selected = req.body;
  const promiseArray = selected.map(async (each) => {
    return new Promise(async (resolve, reject) => {
      await Snippet_Model.findByIdAndDelete(each);
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

const addSnippet = async (req, res) => {
  const formData = req.body;
  const newSnippet = new Snippet_Model({
    ...formData,
    tag: formData.tag.split(","),
    archive: false,
  });

  try {
    await newSnippet.save();
    res.status(201).json(newSnippet);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const searchSnippetById = async (req, res) => {
  const {id: id} = req.params;
  const snippet = await Snippet_Model.find({_id: id});
  res.json(snippet);
};

const editSnippet = async (req, res) => {
  const formData = req.body;
  const snippet = await Snippet_Model.findOneAndUpdate(
    {_id: formData._id},
    {...formData, tag: formData.tag.split(",")},
    {
      new: true,
      useFindAndModify: false,
    }
  );
  res.json({message: "Snippet Edited"});
};

const getAllSnippets = async (req, res) => {
  const {type: type} = req.params;
  try {
    const allCompanies = await Snippet_Model.find({
      type: type,
      archive: false,
    });
    res.status(201).json(allCompanies);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const filterSnippet = async (req, res) => {
  const {name, desc, tag, type} = req.body;
  try {
    const namer = new RegExp(name, "i");
    const descr = new RegExp(desc, "i");
    const snippets = await Snippet_Model.find({
      $or: [{name: namer}, {description: descr}, {tag: {$in: tag}}],
      type: type,
    });
    res.status(200).json(snippets);
  } catch (error) {
    console.log(error);
  }
};

const getAllSnippetsForTemplates = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  Snippet_Model.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const archiveSnippet = async (req, res) => {
  const selected = req.body;
  res.setHeader("Content-Type", "application/json");

  selected.map((s) => {
    Snippet_Model.findOne({_id: s})
      .then((data) => {
        let a = data.archive;
        Snippet_Model.findOneAndUpdate(
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

const getAllSnippetsArchive = async (req, res) => {
  const {type: type} = req.params;
  try {
    const allCompanies = await Snippet_Model.find({
      type: type,
      archive: true,
    });
    res.status(201).json(allCompanies);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
}

module.exports = {
  getAllSnippets,
  editSnippet,
  searchSnippetById,
  seachSnippet,
  deleteSnippet,
  addSnippet,
  filterSnippet,
  getAllSnippetsForTemplates,
  archiveSnippet,
  getAllSnippetsArchive
};
