var express = require("express");
var router = express.Router();
const path = require("path");
const reports = require("../controllers/reportsController");

router.post("/purchaseOrders/getBetweenDates", reports.getOrdersBetweenDates);
router.post("/events/getBetweenDates", reports.getEventsBetweenDates);
router.post("/inputs/getBetweenDates", reports.getInputsBetweenDates);

router.post("/purchaseOrders/getByCode/:code", reports.getOrderByCode);
router.post("/inputs/getByCode/:code", reports.getInputByCode);
router.post("/events/getByCode/:code", reports.getEventByCode);

module.exports = router;
