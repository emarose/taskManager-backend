const mongoose = require("../bin/mongodb");

const countersSchema = new mongoose.Schema({
    _id: Object,
    category_counter: { type: Number, default: 0 },
    product_counter: { type: Number, default: 0 },

});

module.exports = mongoose.model("counters", countersSchema)