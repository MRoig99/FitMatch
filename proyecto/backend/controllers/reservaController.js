const Reserva = require('../models/Reserva');

const reservaController = {
    // GET /reserves - obtindre totes les reserves
    getAll: (req, res) => {
        Reserva.getAll((err, reserves) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir les reserves.' });
            }
            res.json(reserves);
        });
    },

    // GET /reserves/:id - obtindre una reserva per ID
    getById: (req, res) => {
        const id = req.params.id;

        Reserva.getById(id, (err, reserva) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir la reserva.' });
            }
            if (!reserva) {
                return res.status(404).json({ message: 'Reserva no trobada.' });
            }
            res.json(reserva);
        });
    },

    // POST /reserves - crear una nova reserva
    create: (req, res) => {
        const novaReserva = req.body;    
        Reserva.create(novaReserva, (err, resultat) => {
            if (err) {
                return res.status(500).json({ error: 'Error al crear la reserva.' });
            }
            res.status(201).json({ message: 'Reserva creada correctament', id: resultat.insertId });
        });
    }
};

module.exports = reservaController;
