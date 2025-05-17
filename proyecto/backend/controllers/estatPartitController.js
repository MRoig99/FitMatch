const Estat_partit = require('../models/Estat_partit');

const estatPartitController = {
    // GET /estat-partits - obtindre tots els estats de partit
    getAll: (req, res) => {
        Estat_partit.getAll((err, estats) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir els estats de partit.' });
            }
            res.json(estats);
        });
    },

    // GET /estat-partits/:id - obtindre un estat de partit per ID
    getById: (req, res) => {
        const id = req.params.id;

        Estat_partit.getById(id, (err, estat) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir l\'estat de partit.' });
            }
            if (!estat) {
                return res.status(404).json({ message: 'Estat de partit no trobat.' });
            }
            res.json(estat);
        });
    },

    // POST /estat-partits - crear un nou estat de partit
    create: (req, res) => {
        const nouEstat = req.body;

        Estat_partit.create(nouEstat, (err, resultat) => {
            if (err) {
                return res.status(500).json({ error: 'Error al crear l\'estat de partit.' });
            }
            res.status(201).json({ message: 'Estat de partit creat correctament', id: resultat.insertId });
        });
    }
};

module.exports = estatPartitController;
