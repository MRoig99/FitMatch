const express = require('express');
const router = express.Router();
const Estat_pagament = require('../models/Estat_pagament');

// Obtener todos los estados de pago
router.get('/', (req, res) => {
    Estat_pagament.getAll((err, estatPagaments) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(estatPagaments);
    });
});

// Obtener un estado de pago por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Estat_pagament.getById(id, (err, estatPagament) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!estatPagament) {
            return res.status(404).json({ message: 'Estado de pago no encontrado' });
        }
        res.json(estatPagament);
    });
});

// Crear un nuevo estado de pago
router.post('/', (req, res) => {
    const { id_pagament, nom } = req.body;

    if (!id_pagament || !nom) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const nuevoEstatPagament = { id_pagament, nom };

    Estat_pagament.create(nuevoEstatPagament, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Estado de pago creado con éxito', estatPagamentId: results.insertId });
    });
});

module.exports = router;
