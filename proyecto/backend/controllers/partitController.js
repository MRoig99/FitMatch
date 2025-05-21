const Partit = require('../models/Partit');

const partitController = {
    // GET /partits - obtindre tots els partits
    getAll: (req, res) => {
        Partit.getAll((err, partits) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir els partits.' });
            }
            res.json(partits);
        });
    },

    // GET /partits/:id - obtindre un partit per ID
    getById: (req, res) => {
        const id = req.params.id;

        Partit.getById(id, (err, partit) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir el partit.' });
            }
            if (!partit) {
                return res.status(404).json({ message: 'Partit no trobat.' });
            }
            res.json(partit);
        });
    },

    create: (req, res) => {
        const nouPartit = req.body;
        console.log('Dades per crear partit:', nouPartit);

        Partit.create(nouPartit, (err, resultat) => {
            if (err) {
                console.error('Error al crear partit:', err); // <--- esto imprime el error exacto
                return res.status(500).json({ error: 'Error al crear el partit.', details: err.message });
            }
            res.status(201).json({ message: 'Partit creat correctament', id: resultat.insertId });
        });
    }
};

module.exports = partitController;
