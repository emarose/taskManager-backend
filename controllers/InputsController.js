const inputsModel = require("../models/inputsModels");
const formatNumberToCurrency = require("../util/utils");
module.exports = {
  getAll: async function (req, res, next) {
    try {
      const inputs = await inputsModel.find();

      res.json(inputs);
    } catch (e) {
      next(e);
    }
  },
  create: async function (req, res, next) {
    try {
      const document = new inputsModel({
        code: req.body.code,
        enterprise: req.body.enterprise,
        payMethod: req.body.payMethod,
        amount: req.body.amount,
        concept: req.body.concept,
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
      const deleted = await inputsModel.deleteOne({ _id: req.params.id });
      res.json(deleted);
    } catch (e) {
      next(e);
    }
  },
  update: async function (req, res, next) {
    console.log(req.body[0].searchField);

    try {
      const doc = await inputsModel.findOne({ _id: req.params.id });
      const update = { [req.body[0].searchField]: req.body[0].update };
      await doc.updateOne(update);

      res.json(doc);
    } catch (e) {
      console.log(e);
    }
  },
  amount: async function (req, res, next) {
    try {
      const amount = await inputsModel.find({}).sort({ code: -1 }).limit(1);

      res.json(amount[0].code);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};
