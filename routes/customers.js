var express = require("express");
var router = express.Router();
const customersController = require("../controllers/customersController");

/* Cantidad de clientes */
router.get("/countCustomers", customersController.amount);
/* Cargar todos */
router.get("/", customersController.getAll);
/* Cargar todos */
router.get("/:name", customersController.getByName);
/* Agregar */
router.post("/add", customersController.create);
/* Eliminar */
router.delete("/:id", customersController.delete);
/* Actualizar */
router.put("/:id", customersController.update);

module.exports = router;
