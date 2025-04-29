const express = require('express');
const router = express.Router();
const Estat_partit = require('../models/Estat_partit');

// Obtener todos los estados de partido
router.get('/', (req, res) => {
    Estat_partit.getAll((err, estatPartits) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(estatPartits);
    });
});

// Obtener un estado de partido por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Estat_partit.getById(id, (err, estatPartit) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!estatPartit) {
            return res.status(404).json({ message: 'Estado de partido no encontrado' });
        }
        res.json(estatPartit);
    });
});

// Crear un nuevo estado de partido
router.post('/', (req, res) => {
    const { id_partit, nom } = req.body;

    if (!id_partit || !nom) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const nuevoEstatPartit = { id_partit, nom };

    Estat_partit.create(nuevoEstatPartit, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Estado de partido creado con éxito', estatPartitId: results.insertId });
    });
});

module.exports = router;
