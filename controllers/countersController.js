const countersModel = require("../models/countersModels");
module.exports = {
  getAll: async function (req, res, next) {
    //console.log(req.query);
    try {
      const counters = await countersModel.find({ $in: "counter" });

      res.json(counters);
    } catch (e) {
      next(e);
    }
  },
  /*  getById: async function (req, res, next) {
    //console.log(req.params, req.params.id);
    try {
      const documents = await productsModel.findById(req.params.id);
      res.json(documents);
    } catch (e) {
      next(e);
    }
  },
  create: async function (req, res, next) {
    //console.log("req name:", req.body);
    try {
      const data = new productsModel({
        productName: req.body.productName,
        category: req.body.category,
        price: req.body.price,
        cost: req.body.cost,
        details: req.body.details,
      });
      const document = await data.save();

      res.status(201).json(document);
    } catch (e) {
      console.log(e);
      e.status = 400;
      next(e);
    }
  },
  update: async function (req, res, next) {
    console.log(req.body[0].searchField);

    try {
      const doc = await productsModel.findOne({ _id: req.params.id });
      const update = { [req.body[0].searchField]: req.body[0].update };
      await doc.updateOne(update);

      res.json(doc);
    } catch (e) {
      console.log(e);
    }
  },
  delete: async function (req, res, next) {
    try {
      console.log(req.body);
      const deleted = await productsModel.deleteOne({ _id: req.params.id });
      res.json(deleted);
    } catch (e) {
      next(e);
    }
  }, */
};
