var express = require("express");
var router = express.Router();
const purchaseOrdersController = require("../controllers/purchaseOrdersController");

/* Cantidad de transportes */
router.get("/countPurchaseOrders", purchaseOrdersController.amount);
/* Cargar todos */
router.get("/", purchaseOrdersController.getAll);
/* Cargar por ID */
router.get("/:id", purchaseOrdersController.getById);
/* Cargar por Codigo */
router.get("/byCode/:code", purchaseOrdersController.getByCode);
/* Agregar */
router.post("/add", purchaseOrdersController.create);
/* Eliminar */
router.delete("/:id", purchaseOrdersController.delete);
/* Actualizar */
router.put("/:id", purchaseOrdersController.update);
/* Actualizar evento asociado */
router.put("/updateEvent/:id", purchaseOrdersController.updateEvent);
/* Anular */
router.put("/anull/:id", purchaseOrdersController.anullOrder);
/* Desanular */
router.put("/unanull/:id", purchaseOrdersController.unanullOrder);

module.exports = router;
