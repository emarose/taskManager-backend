const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");

const saleModesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  code: {
    type: Number,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    min: 0,
  },
});

module.exports = mongoose.model("saleModes", saleModesSchema);
