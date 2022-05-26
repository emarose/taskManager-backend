const eventsModel = require("../models/eventsModels");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const events = await eventsModel.find();
      //console.log(events);
      res.json(events);
    } catch (e) {
      next(e);
    }
  },
  create: async function (req, res, next) {
    try {
      const document = new eventsModel({
        code: req.body.code,
        name: req.body.name,
        date: req.body.date,
        notes: req.body.notes,
        address: req.body.address,
        orders: req.body.orders,
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
      const deleted = await eventsModel.deleteOne({ _id: req.params.id });
      res.json(deleted);
    } catch (e) {
      next(e);
    }
  },
  update: async function (req, res, next) {
    try {
      console.log(req.body);
      const update = await eventsModel.updateOne(
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
      const amount = await eventsModel.find({}).sort({ code: -1 }).limit(1);
      res.json(amount[0].code);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};
