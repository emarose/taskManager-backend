var express = require("express");
var router = express.Router();
const purchaseOrdersController = require("../controllers/purchaseOrdersController");

/* Cantidad de transportes */
router.get("/countPurchaseOrders", purchaseOrdersController.amount);
/* Cargar todos */
router.get("/", purchaseOrdersController.getAll);
/* Agregar */
router.post("/add", purchaseOrdersController.create);
/* Eliminar */
router.delete("/:id", purchaseOrdersController.delete);
/* Actualizar */
router.put("/:id", purchaseOrdersController.update);

module.exports = router;
