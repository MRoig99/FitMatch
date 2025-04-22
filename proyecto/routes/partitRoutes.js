const express = require('express');
const router = express.Router();
const Partit = require('../models/Partit');

// Obtener todos los partidos
router.get('/', (req, res) => {
    Partit.getAll((err, partits) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(partits);
    });
});

// Obtener un partido por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Partit.getById(id, (err, partit) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!partit) {
            return res.status(404).json({ message: 'Partido no encontrado' });
        }
        res.json(partit);
    });
});

// Crear un nuevo partido
router.post('/', (req, res) => {
    const { id_usuari_creador, id_esport, id_ubicacio, nom, data, maxim_participants, data_creacio, participants, preu, descripcio } = req.body;

    if (!id_usuari_creador || !id_esport || !id_ubicacio || !nom || !data || !maxim_participants || !data_creacio || !preu || !descripcio) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const nuevoPartit = { id_usuari_creador, id_esport, id_ubicacio, nom, data, maxim_participants, data_creacio, participants, preu, descripcio };

    Partit.create(nuevoPartit, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Partido creado con éxito', partitId: results.insertId });
    });
});

module.exports = router;
