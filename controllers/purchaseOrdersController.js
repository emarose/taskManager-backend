const purchaseOrdersModel = require("../models/purchaseOrdersModels");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const purchaseOrders = await purchaseOrdersModel.find();
      /* console.log(purchaseOrders); */
      res.json(purchaseOrders);
    } catch (e) {
      next(e);
    }
  },
  getById: async function (req, res, next) {
    try {
      const documents = await purchaseOrdersModel.find({
        _id: req.params.id,
      });
      res.json(documents);
    } catch (e) {
      next(e);
    }
  },
  getByCode: async function (req, res, next) {
    try {
      const documents = await purchaseOrdersModel.find({
        code: req.params.code,
      });
      res.json(documents);
    } catch (e) {
      next(e);
    }
  },
  create: async function (req, res, next) {
    try {
      const document = new purchaseOrdersModel({
        code: req.body.code,
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
        orderNotes: req.body.orderNotes,
        event:
          req.body.event !== "Sin asociar"
            ? req.body.event.substring(4)
            : req.body.event,
        isDeleted: false,
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
      await purchaseOrdersModel.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { isDeleted: true }
      );
      //  isDeleted: true

      res.json(deleted);
    } catch (e) {
      next(e);
    }
  },
  update: async function (req, res, next) {
    try {
      const doc = await purchaseOrdersModel.findOne({ _id: req.params.id });
      const update = { [req.body[0].searchField]: req.body[0].update };
      await doc.updateOne(update);

      res.json(doc);
    } catch (e) {
      console.log(e);
    }
  },
  updateEvent: async function (req, res, next) {
    try {
      console.log("REQU PARAMS:", req.params, req.body);

      const doc = await purchaseOrdersModel.findOne({ _id: req.params.id });
      const update = req.body;
      await doc.updateOne(req.body);
      res.json(update);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  /* unlinkEvent: async function (req, res, next) {
    try {
      console.log("REQU PARAMS:", req.params, req.body);

      const doc = await purchaseOrdersModel.findOne({ code: req.params.code });
      const update = "Sin asociar";
      await doc.updateOne({ event: "Sin asociar" });
      res.json(update);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }, */
  amount: async function (req, res, next) {
    try {
      const countDoc = await purchaseOrdersModel.countDocuments();
      if (countDoc === 0) {
        res.json(0);
      } else {
        const amount = await purchaseOrdersModel
          .find({})
          .sort({ _id: -1 })
          .limit(1);

        res.json(amount[0].code);
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};
