const Ubicacio = require('../models/Ubicacio');

const ubicacioController = {
    getAll: (req, res) => {
        Ubicacio.getAll((err, ubicacions) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir les ubicacions.' });
            }
            res.json(ubicacions);
        });
    },

    getById: (req, res) => {
        const id = req.params.id;

        Ubicacio.getById(id, (err, ubicacio) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir la ubicació.' });
            }
            if (!ubicacio) {
                return res.status(404).json({ message: 'Ubicació no trobada.' });
            }
            res.json(ubicacio);
        });
    },

    create: (req, res) => {
        const novaUbicacio = req.body;

        Ubicacio.create(novaUbicacio, (err, resultat) => {
            if (err) {
                return res.status(500).json({ error: 'Error al crear la ubicació.' });
            }
            res.status(201).json({ message: 'Ubicació creada correctament', id: resultat.insertId });
        });
    }
};

module.exports = ubicacioController;
