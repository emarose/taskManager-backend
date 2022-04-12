var express = require("express");
var router = express.Router();
const customersController = require("../controllers/customersController");

router.get("/", customersController.getAll);
router.post("/add", customersController.create);
router.delete("/:id", customersController.delete);
router.put("/:id", customersController.update);

module.exports = router;
