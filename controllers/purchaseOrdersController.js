const purchaseOrdersModel = require("../models/purchaseOrdersModels");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const purchaseOrders = await purchaseOrdersModel.find();
      console.log(purchaseOrders);
      res.json(purchaseOrders);
    } catch (e) {
      next(e);
    }
  },
  create: async function (req, res, next) {
    try {
      const document = new purchaseOrdersModel({
        code: req.body.code || 1,
        customer: req.body.customer,
        orderProducts: req.body.orderProducts,

        purchaseDate: req.body.purchaseDate,
        paymentDate: req.body.paymentDate,

        shippingMode: req.body.shippingMode,
        shippingEnterprise: req.body.shippingEnterprise,
        shippingAddress: req.body.shippingAddress,
        shippingState: req.body.shippingState,

        saleMode: req.body.saleMode,
        payMethod: req.body.payMethod,
        paymentState: req.body.paymentState,
        orderNotes: req.body.orderNotes || "Sin observaciones",
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
      const deleted = await purchaseOrdersModel.deleteOne({
        _id: req.params.id,
      });
      res.json(deleted);
    } catch (e) {
      next(e);
    }
  },
  update: async function (req, res, next) {
    console.log(req.body[0].searchField);

    try {
      const doc = await purchaseOrdersModel.findOne({ _id: req.params.id });
      const update = { [req.body[0].searchField]: req.body[0].update };
      await doc.updateOne(update);

      res.json(doc);
    } catch (e) {
      console.log(e);
    }
  },
  amount: async function (req, res, next) {
    try {
      const amount = await purchaseOrdersModel
        .find({})
        .sort({ code: -1 })
        .limit(1);
      res.json(amount[0].code);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};
