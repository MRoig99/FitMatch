const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historialController');

router.get('/', historialController.getAll);
router.get('/:id', historialController.getById);
router.post('/', historialController.create);

module.exports = router;
