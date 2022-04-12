const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");

const customerschema = mongoose.Schema({
  name: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  notes: {
    type: String,
  },
});

customerschema.set("toJSON", { getters: true, virtuals: true });

//Creacion modelo (Clase -> POO)
module.exports = mongoose.model("customers", customerschema);
