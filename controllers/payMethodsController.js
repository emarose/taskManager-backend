const payMethodsModel = require("../models/payMethodsModel");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const payMethods = await payMethodsModel.find();
      //console.log(payMethods);
      res.json(payMethods);
    } catch (e) {
      next(e);
    }
  },
  create: async function (req, res, next) {
    try {
      const document = new payMethodsModel({
        code: req.body.code,
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
      const deleted = await payMethodsModel.deleteOne({ _id: req.params.id });
      res.json(deleted);
    } catch (e) {
      next(e);
    }
  },
  update: async function (req, res, next) {
    try {
      console.log(req.body);
      const update = await payMethodsModel.updateOne(
        { _id: req.params.id },
        req.body
      );
      res.json(update);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  amount: async function (req, res, next) {
    try {
      const amount = await payMethodsModel.find({}).sort({ _id: -1 }).limit(1);

      res.json(amount[0].code);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};
