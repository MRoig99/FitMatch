const express = require('express');
const router = express.Router();
const Ubicacio = require('../models/Ubicacio');

// Obtener todas las ubicaciones
router.get('/', (req, res) => {
    Ubicacio.getAll((err, ubicaciones) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(ubicaciones);
    });
});

// Obtener una ubicación por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Ubicacio.getById(id, (err, ubicacion) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!ubicacion) {
            return res.status(404).json({ message: 'Ubicación no encontrada' });
        }
        res.json(ubicacion);
    });
});

// Crear una nueva ubicación
router.post('/', (req, res) => {
    const { nom, direccio, ciutat, telefon } = req.body;

    if (!nom || !direccio || !ciutat || !telefon) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const nuevaUbicacion = { nom, direccio, ciutat, telefon };

    Ubicacio.create(nuevaUbicacion, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Ubicación creada con éxito', ubicacionId: results.insertId });
    });
});

module.exports = router;
