const { db } = require("../models/categoriesModel");
const categoriesModel = require("../models/categoriesModel");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const categories = await categoriesModel.find();
      console.log(categories);
      res.json(categories);
    } catch (e) {
      next(e);
    }
  },
  create: async function (req, res, next) {
    try {
      console.log(req.body.name);

      const document = new categoriesModel({
        name: req.body.name,
      });

      const response = await document.save();

      res.json(response);
    } catch (e) {
      //e.status=200
      next(e);
    }
  },
  delete: async function (req, res, next) {
    try {
    const deleted = await categoriesModel.deleteOne({_id:req.params.id})
    res.json(deleted)
    } catch (e) {
      next(e);
    }
  },
 
};
