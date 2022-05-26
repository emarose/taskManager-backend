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
  notes: {
    type: String,
  },
});

eventsSchema.set("toJSON", { getters: true, virtuals: true });

//Creacion modelo (Clase -> POO)
module.exports = mongoose.model("events", eventsSchema);
