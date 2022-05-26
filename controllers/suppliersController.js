const suppliersModel = require("../models/suppliersModels");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const suppliers = await suppliersModel.find();
      res.json(suppliers);
    } catch (e) {
      next(e);
    }
  },
  create: async function (req, res, next) {
    try {
      const document = new suppliersModel({
        code: req.body.code,
        enterprise: req.body.enterprise,
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
      const deleted = await suppliersModel.deleteOne({ _id: req.params.id });
      res.json(deleted);
    } catch (e) {
      next(e);
    }
  },
  update: async function (req, res, next) {
    console.log(req.body[0].searchField);

    try {
      const doc = await suppliersModel.findOne({ _id: req.params.id });
      const update = { [req.body[0].searchField]: req.body[0].update };
      await doc.updateOne(update);

      res.json(doc);
    } catch (e) {
      console.log(e);
    }
  },
  amount: async function (req, res, next) {
    try {
      const amount = await suppliersModel.find({}).sort({ code: -1 }).limit(1);

      res.json(amount[0].code);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};
