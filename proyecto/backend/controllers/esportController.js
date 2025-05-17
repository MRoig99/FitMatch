const Esport = require('../models/Esport');

const esportController = {
    // GET /esports - obtindre tots els esports
    getAll: (req, res) => {
        Esport.getAll((err, esports) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir els esports.' });
            }
            res.json(esports);
        });
    },

    // GET /esports/:id - obtindre un esport per ID
    getById: (req, res) => {
        const id = req.params.id;

        Esport.getById(id, (err, esport) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir l\'esport.' });
            }
            if (!esport) {
                return res.status(404).json({ message: 'Esport no trobat.' });
            }
            res.json(esport);
        });
    },

    // POST /esports - crear un nou esport
    create: (req, res) => {
        const nouEsport = req.body;

        Esport.create(nouEsport, (err, resultat) => {
            if (err) {
                return res.status(500).json({ error: 'Error al crear l\'esport.' });
            }
            res.status(201).json({ message: 'Esport creat correctament', id: resultat.insertId });
        });
    }
};

module.exports = esportController;
