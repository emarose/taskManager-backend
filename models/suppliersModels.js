var mongoose = require("mongoose");
const errorMessage = require("../util/errorMessage");

const suppliersSchema = mongoose.Schema({
  code: {
    type: Number,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    min: 0,
  },
  enterprise: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  address: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  contact: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  notes: {
    type: String,
  },
});

suppliersSchema.set("toJSON", { getters: true, virtuals: true });

//Creacion modelo (Clase -> POO)
module.exports = mongoose.model("suppliers", suppliersSchema);
