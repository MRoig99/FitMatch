const Usuario = require('../models/Usuario');

const usuarioController = {
    // GET /usuaris - obtindre tots els usuaris
    getAll: (req, res) => {
        Usuario.getAll((err, usuaris) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir els usuaris.' });
            }
            res.json(usuaris);
        });
    },

    // GET /usuaris/:id - obtindre un usuari per ID
    getById: (req, res) => {
        const id = req.params.id;

        Usuario.getById(id, (err, usuari) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir l\'usuari.' });
            }
            if (!usuari) {
                return res.status(404).json({ message: 'Usuari no trobat.' });
            }
            res.json(usuari);
        });
    },

    // POST /usuaris - crear un nou usuari
    create: (req, res) => {
        const nouUsuari = req.body;

        Usuario.create(nouUsuari, (err, resultat) => {
            if (err) {
                return res.status(500).json({ error: 'Error al crear l\'usuari.' });
            }
            res.status(201).json({ message: 'Usuari creat correctament', id: resultat.insertId });
        });
    },

    // GET /usuaris/email/:email - buscar per correu electrònic
    findByEmail: (req, res) => {
        const email = req.params.email;

        Usuario.findByEmail(email, (err, usuari) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar l\'usuari per correu electrònic.' });
            }
            if (!usuari) {
                return res.status(404).json({ message: 'Usuari no trobat amb aquest correu.' });
            }
            res.json(usuari);
        });
    }
};

module.exports = usuarioController;
