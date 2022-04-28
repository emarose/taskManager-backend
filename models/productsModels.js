var mongoose = require("mongoose");
const errorMessage = require("../util/errorMessage");

const productSchema = mongoose.Schema({
  code: {
    type: Number,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    min: 0,
  },
  productName: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  category: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  /*
    categoriaProducto: {
    type: mongoose.Schema.ObjectId,
    ref: "categorias",
  }, */
  price: {
    type: Number,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    min: 1,
    /*  get: function (value) {
      return value * 1.21;
    }, */
  },
  cost: {
    type: Number,
    //required: [true, errorMessage.GENERAL.campo_obligatorio],
    min: 0,
  },
  details: {
    type: String,
    default: "Sin detalles",
    required: false,
  },
});
productSchema.virtual("price_currency").get(function () {
  let price = this.price.toFixed(2).replace(".", ",");
  return `$ ${String(price).replace(
    /(?<!\,.*)(\d)(?=(?:\d{3})+(?:\,|$))/g,
    "$1."
  )}`;
});

productSchema.virtual("cost_currency").get(function () {
  let cost = this.cost.toFixed(2).replace(".", ",");
  return `$ ${String(cost).replace(
    /(?<!\,.*)(\d)(?=(?:\d{3})+(?:\,|$))/g,
    "$1."
  )}`;
});

/* productSchema.pre("save", function (next) {
  var docId = this._id;

  const countercollection = countersModels._id;

  var counter = countersModels.findOneAndUpdate(
    { _id: this._id },
    { $inc: { product_counter: 1 } },
    { returnNewDocument: true, upsert: true }
  );

  var updateRes = productSchema.updateOne(
    { _id: docId },
    { $set: { productId: counter.product_counter } }
  );
  console.log(updateRes);
}); */

productSchema.set("toJSON", { getters: true, virtuals: true });

//Creacion modelo (Clase -> POO)
module.exports = mongoose.model("products", productSchema);
