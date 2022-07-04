var mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(
  "process.env.MONGODB_CONNECTION_STRING",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error) {
    if (error) {
      throw error;
    } else {
      console.log("Conectado a MongoDB");
    }
  }
);
module.exports = mongoose;
