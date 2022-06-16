var express = require("express");
var router = express.Router();
const eventsController = require("../controllers/eventsController");

/* Cantidad de transportes */
router.get("/countEvents", eventsController.amount);
/* Cargar todos */
router.get("/", eventsController.getAll);

/* Cargar por Codigo */
/* router.get("/byCode/:code", eventsController.getByCode); */

/* Cargar por ID */
router.get("/byId/:id", eventsController.getById);
/* Agregar */
router.post("/add", eventsController.create);
/* Eliminar */
router.delete("/:id", eventsController.delete);
/* Actualizar */
router.put("/:id", eventsController.update);
/* Desasociar */
router.put("/unlink/:code", eventsController.unlink);

module.exports = router;
