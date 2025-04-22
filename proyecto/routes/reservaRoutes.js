const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');

// Obtener todas las reservas
router.get('/', (req, res) => {
    Reserva.getAll((err, reservas) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(reservas);
    });
});

// Obtener una reserva por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Reserva.getById(id, (err, reserva) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.json(reserva);
    });
});

// Crear una nueva reserva
router.post('/', (req, res) => {
    const { id_usuari, id_partit, data_reserva } = req.body;

    if (!id_usuari || !id_partit || !data_reserva) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const nuevaReserva = { id_usuari, id_partit, data_reserva };

    Reserva.create(nuevaReserva, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Reserva creada con éxito', reservaId: results.insertId });
    });
});

module.exports = router;
