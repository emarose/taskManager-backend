const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
require("dotenv").config();

const tasksRouter = require("./routes/tasks");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");

const baseUrl = process.env.baseURL || "http://localhost:3000";

mongoose
  .connect(
    "mongodb+srv://emarose:12Metallica12@cluster0.wj35z.mongodb.net/taskManager?authSource=admin&replicaSet=atlas-gstol5-shard-0&readPreference=primary&ssl=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
app.use(bodyParser.json());
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/tasks", tasksRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({ error: true, message: err.message });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Express conectado en el puerto ${process.env.PORT || 3000}`);
});

module.exports = app;
