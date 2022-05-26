var express = require("express");
var router = express.Router();
const eventsController = require("../controllers/eventsController");

/* Cantidad de transportes */
router.get("/countEvents", eventsController.amount);
/* Cargar todos */
router.get("/", eventsController.getAll);
/* Agregar */
router.post("/add", eventsController.create);
/* Eliminar */
router.delete("/:id", eventsController.delete);
/* Actualizar */
router.put("/:id", eventsController.update);

module.exports = router;
