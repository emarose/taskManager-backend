var express = require("express");
var router = express.Router();
const payMethodsController = require("../controllers/payMethodsController");

router.get("/", payMethodsController.getAll);
router.post("/add", payMethodsController.create);
router.delete("/:id", payMethodsController.delete);
router.put("/:id", payMethodsController.update);
router.get("/countPayMethods", payMethodsController.amount);

module.exports = router;
