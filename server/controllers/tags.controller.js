const Snippet_Model = require('../models/Snippet');

const getAllTags = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    var allTagsaArr = [];
    Snippet_Model.find({}, {tag: 1})
      .then((data) => {
        data.map((d) => {
          var newTag = d.tag;
          newTag.map((t) => {
            allTagsaArr.push({t});
          });
        });
        res.status(200).json(allTagsaArr);
      })
      .catch((err) => res.status(400).json(`Error: ${err}`));
}

const getAllTagTemplates = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    var allTagsaArr = [];
    Template_Model.find({}, {tag: 1})
      .then((data) => {
        data.map((d) => {
          var newTag = d.tag;
          newTag.map((t) => {
            allTagsaArr.push({t});
          });
        });
        res.status(200).json(allTagsaArr);
      })
      .catch((err) => res.status(400).json(`Error: ${err}`));
}

module.exports = {
    getAllTagTemplates,
    getAllTags
}
