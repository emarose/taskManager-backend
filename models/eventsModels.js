var mongoose = require("mongoose");
const errorMessage = require("../util/errorMessage");

const eventsSchema = mongoose.Schema({
  code: {
    type: Number,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    min: 0,
  },
  name: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  address: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  orders: {
    type: Array,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  date: {
    type: Date,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  cost: {
    type: Number,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    min: 0,
  },
  notes: {
    type: String,
  },
});

eventsSchema.virtual("cost_currency").get(function () {
  let cost = this.cost.toFixed(2).replace(".", ",");
  return `$ ${String(cost).replace(
    /(?<!\,.*)(\d)(?=(?:\d{3})+(?:\,|$))/g,
    "$1."
  )}`;
});
eventsSchema.set("toJSON", { getters: true, virtuals: true });

//Creacion modelo (Clase -> POO)
module.exports = mongoose.model("events", eventsSchema);
