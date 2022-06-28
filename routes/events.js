var express = require("express");
var router = express.Router();
const eventsController = require("../controllers/eventsController");

/* Cantidad de eventos */
router.get("/countEvents", eventsController.amount);
/* Cargar todos */
router.get("/", eventsController.getAll);
/* Cargar por ID */
router.get("/byId/:id", eventsController.getById);
/* Actualizar */
router.put("/:id", eventsController.update);
/* Agregar */
router.post("/add", eventsController.create);
/* Eliminar */
router.delete("/:id", eventsController.delete);
/* Desasociar */
router.put("/unlink/:code", eventsController.unlink);
/* Asociar */
router.put("/link/:code", eventsController.link);
/* Cargar por Codigo */
/* router.get("/byCode/:code", eventsController.getByCode); */

module.exports = router;
