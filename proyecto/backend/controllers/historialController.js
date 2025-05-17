const Historial = require('../models/Historial');

const historialController = {
    // GET /historial - obtindre tots els registres d'historial
    getAll: (req, res) => {
        Historial.getAll((err, histo) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir l\'historial.' });
            }
            res.json(histo);
        });
    },

    // GET /historial/:id - obtindre un registre d'historial per ID
    getById: (req, res) => {
        const id = req.params.id;

        Historial.getById(id, (err, registre) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir l\'historial.' });
            }
            if (!registre) {
                return res.status(404).json({ message: 'Registre d\'historial no trobat.' });
            }
            res.json(registre);
        });
    },

    // POST /historial - crear un nou registre d'historial
    create: (req, res) => {
        const nouHistorial = req.body;

        Historial.create(nouHistorial, (err, resultat) => {
            if (err) {
                return res.status(500).json({ error: 'Error al crear el registre d\'historial.' });
            }
            res.status(201).json({ message: 'Registre d\'historial creat correctament', id: resultat.insertId });
        });
    }
};

module.exports = historialController;
