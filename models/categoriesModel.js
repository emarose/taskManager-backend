const mongoose = require("../bin/mongodb");

const categorySchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model("categories", categorySchema)