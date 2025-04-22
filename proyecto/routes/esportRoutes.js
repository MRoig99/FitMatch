const express = require('express');
const router = express.Router();
const Esport = require('../models/Esport');

// Obtener todos los deportes
router.get('/', (req, res) => {
    Esport.getAll((err, esports) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(esports);
    });
});

// Obtener un deporte por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Esport.getById(id, (err, esport) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!esport) {
            return res.status(404).json({ message: 'Deporte no encontrado' });
        }
        res.json(esport);
    });
});

// Crear un nuevo deporte
router.post('/', (req, res) => {
    const { nom } = req.body;

    if (!nom) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const nuevoEsport = { nom };

    Esport.create(nuevoEsport, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Deporte creado con éxito', esportId: results.insertId });
    });
});

module.exports = router;
