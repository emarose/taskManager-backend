var mongoose = require("mongoose");
const errorMessage = require("../util/errorMessage");

const inputsSchema = mongoose.Schema({
  code: {
    type: Number,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    min: 0,
  },
  enterprise: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  amount: {
    type: Number,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  concept: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  notes: {
    type: String,
  },
  payMethod: {
    type: String,
  },
  purchaseDate: {
    type: Date,
    default: new Date(),
  },
});

inputsSchema.virtual("amount_currency").get(function () {
  let amount = this.amount.toFixed(2).replace(".", ",");
  return `$ ${String(amount).replace(
    /(?<!\,.*)(\d)(?=(?:\d{3})+(?:\,|$))/g,
    "$1."
  )}`;
});
inputsSchema.set("toJSON", { getters: true, virtuals: true });

//Creacion modelo (Clase -> POO)
module.exports = mongoose.model("inputs", inputsSchema);
