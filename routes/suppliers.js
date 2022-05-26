var express = require("express");
var router = express.Router();
const suppliersController = require("../controllers/suppliersController");

/* Cantidad de transportes */
router.get("/countSuppliers", suppliersController.amount);
/* Cargar todos */
router.get("/", suppliersController.getAll);
/* Agregar */
router.post("/add", suppliersController.create);
/* Eliminar */
router.delete("/:id", suppliersController.delete);
/* Actualizar */
router.put("/:id", suppliersController.update);

module.exports = router;
