const express = require('express');
const router = express.Router();
const Pagos = require('../models/Pagos');

// Obtener todos los pagos
router.get('/', (req, res) => {
    Pagos.getAll((err, pagos) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(pagos);
    });
});

// Obtener un pago por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Pagos.getById(id, (err, pago) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!pago) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        res.json(pago);
    });
});

// Crear un nuevo pago
router.post('/', (req, res) => {
    const { id_reserva, total, data_pagament, metode_pagament, comisio } = req.body;

    if (!id_reserva || !total || !data_pagament || !metode_pagament || !comisio) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const nuevoPago = { id_reserva, total, data_pagament, metode_pagament, comisio };

    Pagos.create(nuevoPago, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Pago creado con éxito', pagoId: results.insertId });
    });
});

module.exports = router;
