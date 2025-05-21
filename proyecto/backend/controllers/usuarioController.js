const Usuario = require('../models/Usuario');

const usuarioController = {
    getAll: (req, res) => {
        Usuario.getAll((err, usuaris) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los usuarios.' });
            }
            res.json(usuaris);
        });
    },

    getById: (req, res) => {
        const id = req.params.id;

        Usuario.getById(id, (err, usuari) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener el usuario.' });
            }
            if (!usuari) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }
            res.json(usuari);
        });
    },

    create: (req, res) => {
        const nouUsuari = req.body;

        Usuario.create(nouUsuari, (err, resultat) => {
            if (err) {
                return res.status(500).json({ error: 'Error al crear el usuario.' });
            }
            res.status(201).json({ message: 'Usuario creado correctamente', id: resultat.insertId });
        });
    },

    findByEmail: (req, res) => {
        const email = req.params.email;

        Usuario.findByEmail(email, (err, usuari) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar el usuario por correo electrónico.' });
            }
            if (!usuari) {
                return res.status(404).json({ message: 'Usuario no encontrado con ese correo.' });
            }
            res.json(usuari);
        });
    },

    login: (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
        }

        Usuario.findByEmail(email, (err, usuari) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar el usuario.' });
            }
            if (!usuari) {
                return res.status(401).json({ message: 'Credenciales incorrectas.' });
            }

            if (usuari.contrasenya !== password) {
                return res.status(401).json({ message: 'Credenciales incorrectas.' });
            }

            const { contrasenya, ...usuariSensePassword } = usuari;
            res.json({ usuari: usuariSensePassword });
        });
    }
};

module.exports = usuarioController;
