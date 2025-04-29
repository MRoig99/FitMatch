const express = require('express');
const router = express.Router();
const Historial = require('../models/Historial');

// Obtener todos los historiales
router.get('/', (req, res) => {
    Historial.getAll((err, historiales) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(historiales);
    });
});

// Obtener un historial por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Historial.getById(id, (err, historial) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!historial) {
            return res.status(404).json({ message: 'Historial no encontrado' });
        }
        res.json(historial);
    });
});

// Crear un nuevo historial
router.post('/', (req, res) => {
    const { id_usuari, id_partit, resultat } = req.body;

    if (!id_usuari || !id_partit || !resultat) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const nuevoHistorial = { id_usuari, id_partit, resultat };

    Historial.create(nuevoHistorial, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Historial creado con éxito', historialId: results.insertId });
    });
});

module.exports = router;
