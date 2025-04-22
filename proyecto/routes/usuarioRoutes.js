const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Obtener todos los usuarios
router.get('/', (req, res) => {
    Usuario.getAll((err, usuarios) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(usuarios);
    });
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Usuario.getById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
    const { nom, cognom, edat, contrasenya, correu_electronic } = req.body;

    if (!nom || !cognom || !edat || !contrasenya || !correu_electronic) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const nuevoUsuario = { nom, cognom, edat, contrasenya, correu_electronic };

    Usuario.create(nuevoUsuario, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Usuario creado con éxito', usuarioId: results.insertId });
    });
});

module.exports = router;
