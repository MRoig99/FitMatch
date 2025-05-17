const Estat_pagament = require('../models/Estat_pagament');

const estatPagamentController = {
    // GET /estat-pagaments - obtindre tots els estats de pagament
    getAll: (req, res) => {
        Estat_pagament.getAll((err, estats) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir els estats de pagament.' });
            }
            res.json(estats);
        });
    },

    // GET /estat-pagaments/:id - obtindre un estat de pagament per ID
    getById: (req, res) => {
        const id = req.params.id;

        Estat_pagament.getById(id, (err, estat) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir l\'estat de pagament.' });
            }
            if (!estat) {
                return res.status(404).json({ message: 'Estat de pagament no trobat.' });
            }
            res.json(estat);
        });
    },

    // POST /estat-pagaments - crear un nou estat de pagament
    create: (req, res) => {
        const nouEstat = req.body;

        Estat_pagament.create(nouEstat, (err, resultat) => {
            if (err) {
                return res.status(500).json({ error: 'Error al crear l\'estat de pagament.' });
            }
            res.status(201).json({ message: 'Estat de pagament creat correctament', id: resultat.insertId });
        });
    }
};

module.exports = estatPagamentController;
