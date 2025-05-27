const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.get('/', reservaController.getAll);
router.get('/:id', reservaController.getById);
router.post('/', reservaController.create);
router.get('/partit/:idPartit', reservaController.getByPartit);
router.patch('/:id', reservaController.updDisponibilitat);

module.exports = router;
