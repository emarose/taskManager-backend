var express = require("express");
var router = express.Router();
const countersController = require("../controllers/countersController");

router.get("/", countersController.getAll);
/* router.post("/add", categoriesController.create);
router.delete("/:id", categoriesController.delete);
router.put("/:id", categoriesController.update); */

module.exports = router;
