var express = require("express");
var router = express.Router();

const productsController = require("../controllers/productsController");

/* Cantidad de productos */
router.get("/countProducts", productsController.amount);
/* Cargar todos */
router.get("/", productsController.getAll);
/* Agregar */
router.post("/add", productsController.create);
/* Eliminar */
router.delete("/:id", productsController.delete);
/* Actualizar */
router.put("/:id", productsController.update);
/* Cargar por ID */
router.get("/:id", productsController.getById);

module.exports = router;
