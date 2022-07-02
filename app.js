var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
require("dotenv").config();

var indexRouter = require("./routes/index");
var customersRouter = require("./routes/customers");
var shippingRouter = require("./routes/shipping");
var productsRouter = require("./routes/products");
var categoriesRouter = require("./routes/categories");
var saleModesRouter = require("./routes/saleModes");
var payMethodsRouter = require("./routes/payMethods");
var purchaseOrdersRouter = require("./routes/purchaseOrders");
var reportsRouter = require("./routes/reports");
var suppliersRouter = require("./routes/suppliers");
var inputsRouter = require("./routes/inputs");
var eventsRouter = require("./routes/events");
var app = express();
var cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/customers", customersRouter);
app.use("/shipping", shippingRouter);
app.use("/suppliers", suppliersRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/purchaseOrders", purchaseOrdersRouter);
app.use("/saleModes", saleModesRouter);
app.use("/payMethods", payMethodsRouter);
app.use("/inputs", inputsRouter);
app.use("/reports", reportsRouter);
app.use("/events", eventsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: true, message: err.message });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Puerto conectado en el puerto " + process.env.PORT || 3000);
});

module.exports = app;
