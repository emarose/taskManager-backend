var express = require("express");
var router = express.Router();
const saleModesController = require("../controllers/saleModesController");

router.get("/", saleModesController.getAll);
router.post("/add", saleModesController.create);
router.delete("/:id", saleModesController.delete);
router.put("/:id", saleModesController.update);
router.get("/countSaleModes", saleModesController.amount);

module.exports = router;
