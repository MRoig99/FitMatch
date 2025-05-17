const express = require('express');
const router = express.Router();
const estatReservaController = require('../controllers/estatReservaController');

router.get('/', estatReservaController.getAll);
router.get('/:id', estatReservaController.getById);
router.post('/', estatReservaController.create);

module.exports = router;
