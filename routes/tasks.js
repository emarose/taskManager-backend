var express = require("express");
var router = express.Router();
const tasksController = require("../controllers/tasksController");

/* Agregar */
router.post("/add", tasksController.create);
/* Cargar todos */
router.get("/", tasksController.getAll);
/* Cargar todos */
router.get("/:id", tasksController.getById);
/* Eliminar */
router.delete("/:id", tasksController.delete);
/* Actualizar */
router.put("/:id", tasksController.update);

module.exports = router;
