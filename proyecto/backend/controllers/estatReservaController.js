const Estat_reserva = require('../models/Estat_reserva');

const estatReservaController = {
    // GET /estat-reserves - obtindre tots els estats de reserva
    getAll: (req, res) => {
        Estat_reserva.getAll((err, estats) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir els estats de reserva.' });
            }
            res.json(estats);
        });
    },

    // GET /estat-reserves/:id - obtindre un estat de reserva per ID
    getById: (req, res) => {
        const id = req.params.id;

        Estat_reserva.getById(id, (err, estat) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir l\'estat de reserva.' });
            }
            if (!estat) {
                return res.status(404).json({ message: 'Estat de reserva no trobat.' });
            }
            res.json(estat);
        });
    },

    // POST /estat-reserves - crear un nou estat de reserva
    create: (req, res) => {
        const nouEstat = req.body;

        Estat_reserva.create(nouEstat, (err, resultat) => {
            if (err) {
                return res.status(500).json({ error: 'Error al crear l\'estat de reserva.' });
            }
            res.status(201).json({ message: 'Estat de reserva creat correctament', id: resultat.insertId });
        });
    }
};

module.exports = estatReservaController;
