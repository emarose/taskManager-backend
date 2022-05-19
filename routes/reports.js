var express = require("express");
var router = express.Router();
const path = require("path");
const reports = require("../controllers/reportsController");

router.post("/getOrdersBetweenDates", reports.getOrdersBetweenDates);
router.post("/getOrderByCode/:code", reports.getOrderByCode);
router.delete("/:id", reports.delete);
router.put("/:id", reports.update);

module.exports = router;
