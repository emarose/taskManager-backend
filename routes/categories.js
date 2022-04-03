var express = require('express');
var router = express.Router();
const categoriesController = require("../controllers/categoriesController")

router.get('/', categoriesController.getAll);
router.post('/add', categoriesController.create);
router.delete('/:id', categoriesController.delete);


module.exports = router;
