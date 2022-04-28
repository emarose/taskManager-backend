var mongoose = require("mongoose");
const errorMessage = require("../util/errorMessage");

const purchaseOrdersSchema = mongoose.Schema({
  code: {
    type: Number,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    min: 0,
  },
  customer: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  orderProducts: {
    type: Array,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  purchaseDate: {
    type: Date,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  paymentDate: {
    type: Date,
  },
  shippingMode: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  shippingEnterprise: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  shippingAddress: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  shippingState: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  saleMode: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  payMethod: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  paymentState: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  orderNotes: {
    type: String,
  },
  orderState: {
    type: String,
  },
});

purchaseOrdersSchema.set("toJSON", { getters: true, virtuals: true });

//Creacion modelo (Clase -> POO)
module.exports = mongoose.model("purchaseOrders", purchaseOrdersSchema);
