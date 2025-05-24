const express = require('express');
const router = express.Router();
const pistaController = require('../controllers/pistaController');

// Ruta para obtener pistas disponibles
router.get('/disponibles', pistaController.getPistasDisponibles);
router.patch('/:id', pistaController.updateDisponibilitat);
router.get('/reservades', pistaController.getPistesReservadesActives);


module.exports = router;
