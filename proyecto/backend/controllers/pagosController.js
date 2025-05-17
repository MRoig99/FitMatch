const Pagos = require('../models/Pagos');

const pagosController = {
    // GET /pagaments - obtindre tots els pagaments
    getAll: (req, res) => {
        Pagos.getAll((err, pagaments) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir els pagaments.' });
            }
            res.json(pagaments);
        });
    },

    // GET /pagaments/:id - obtindre un pagament per ID
    getById: (req, res) => {
        const id = req.params.id;

        Pagos.getById(id, (err, pagament) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir el pagament.' });
            }
            if (!pagament) {
                return res.status(404).json({ message: 'Pagament no trobat.' });
            }
            res.json(pagament);
        });
    },

    // POST /pagaments - crear un nou pagament
    create: (req, res) => {
        const nouPagament = req.body;

        Pagos.create(nouPagament, (err, resultat) => {
            if (err) {
                return res.status(500).json({ error: 'Error al crear el pagament.' });
            }
            res.status(201).json({ message: 'Pagament creat correctament', id: resultat.insertId });
        });
    }
};

module.exports = pagosController;
