const express = require('express');
const router = express.Router();
const Estat_reserva = require('../models/Estat_reserva');

// Obtener todos los estados de reserva
router.get('/', (req, res) => {
    Estat_reserva.getAll((err, estatReserves) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(estatReserves);
    });
});

// Obtener un estado de reserva por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Estat_reserva.getById(id, (err, estatReserva) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!estatReserva) {
            return res.status(404).json({ message: 'Estado de reserva no encontrado' });
        }
        res.json(estatReserva);
    });
});

// Crear un nuevo estado de reserva
router.post('/', (req, res) => {
    const { id_reserva, nom } = req.body;

    if (!id_reserva || !nom) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const nuevoEstatReserva = { id_reserva, nom };

    Estat_reserva.create(nuevoEstatReserva, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Estado de reserva creado con éxito', estatReservaId: results.insertId });
    });
});

module.exports = router;
