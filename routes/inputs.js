var express = require("express");
var router = express.Router();
const inputsController = require("../controllers/inputsController");

/* Cantidad de transportes */
router.get("/countInputs", inputsController.amount);
/* Cargar todos */
router.get("/", inputsController.getAll);
/* Agregar */
router.post("/add", inputsController.create);
/* Eliminar */
router.delete("/:id", inputsController.delete);
/* Actualizar */
router.put("/:id", inputsController.update);

module.exports = router;
