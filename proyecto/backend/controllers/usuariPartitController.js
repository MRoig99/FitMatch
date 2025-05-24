const UsuariPartit = require('../models/UsuariPartit');  // Importamos el modelo UsuariPartit

const usuariPartitController = {

    getByPartido: (req, res) => {
        const { id_partit } = req.params;

        UsuariPartit.getByPartido(id_partit, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los usuarios del partido.' });
            }
            res.json(result);
        });
    },

    getByUsuario: (req, res) => {
        const { id_usuari } = req.params;

        UsuariPartit.getByUsuario(id_usuari, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los partidos del usuario.' });
            }
            res.json(result);
        });
    },

    create: (req, res) => {
        const { id_usuari, id_partit } = req.body;  

        if (!id_usuari || !id_partit) {
            return res.status(400).json({ error: 'Faltan datos para asignar el usuario al partido' });
        }

        UsuariPartit.create({ id_usuari, id_partit }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al crear la relación usuario-partido: ' + err.message });
            }
            res.status(201).json({ message: 'Relación creada correctamente', id: result.insertId });
        });
    },

    delete: (req, res) => {
        const { id } = req.params;

        UsuariPartit.delete(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar el registro.' });
            }
            res.status(200).json({ message: 'Registro eliminado correctamente' });
        });
    }
};

module.exports = usuariPartitController;
