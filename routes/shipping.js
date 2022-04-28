var express = require("express");
var router = express.Router();
const shippingController = require("../controllers/shippingController");

/* Cantidad de transportes */
router.get("/countShipping", shippingController.amount);
/* Cargar todos */
router.get("/", shippingController.getAll);
/* Agregar */
router.post("/add", shippingController.create);
/* Eliminar */
router.delete("/:id", shippingController.delete);
/* Actualizar */
router.put("/:id", shippingController.update);

module.exports = router;
