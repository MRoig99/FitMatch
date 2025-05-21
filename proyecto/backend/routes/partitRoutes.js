const express = require('express');
const router = express.Router();
const partitController = require('../controllers/partitController');

router.get('/', partitController.getAll);
router.get('/:id', partitController.getById);
router.post('/', partitController.create);
router.use((req, res, next) => {
  console.log(`Petición recibida en /partits ${req.method} ${req.path}`);
  next();
});

module.exports = router;
