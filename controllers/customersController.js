const { db } = require("../models/customersModel");
const customersModel = require("../models/customersModel");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const customers = await customersModel.find();
      console.log(customers);
      res.json(customers);
    } catch (e) {
      next(e);
    }
  },
  create: async function (req, res, next) {
    try {
      console.log(req.body.name);

      const document = new customersModel({
        name: req.body.name,
        address: req.body.address,
        contact: req.body.contact,
        notes: req.body.notes,
      });

      const response = await document.save();

      res.json(response);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  delete: async function (req, res, next) {
    try {
      const deleted = await customersModel.deleteOne({ _id: req.params.id });
      res.json(deleted);
    } catch (e) {
      next(e);
    }
  },
  update: async function (req, res, next) {
    console.log(req.body[0].searchField);

    try {
      const doc = await customersModel.findOne({ _id: req.params.id });
      const update = { [req.body[0].searchField]: req.body[0].update };
      await doc.updateOne(update);

      res.json(doc);
    } catch (e) {
      console.log(e);
    }
  },
};
