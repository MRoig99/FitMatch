const express = require('express');
const router = express.Router();
const Equip = require('../models/Equip');

// Obtener todos los equipos
router.get('/', (req, res) => {
    Equip.getAll((err, equips) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(equips);
    });
});

// Obtener un equipo por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Equip.getById(id, (err, equip) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!equip) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.json(equip);
    });
});

// Crear un nuevo equipo
router.post('/', (req, res) => {
    const { id_partit, nom, jugadors, num_jugadors } = req.body;

    if (!id_partit || !nom || !jugadors || !num_jugadors) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const nuevoEquip = { id_partit, nom, jugadors, num_jugadors };

    Equip.create(nuevoEquip, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Equipo creado con éxito', equipId: results.insertId });
    });
});

module.exports = router;
