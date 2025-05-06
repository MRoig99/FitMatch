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

    // Validar que todos los campos sean proporcionados
    if (!nom || !cognom || !edat || !contrasenya || !correu_electronic) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Validar que la edad sea un número y esté en un rango razonable
    if (isNaN(edat) || edat < 18 || edat > 120) {
        return res.status(400).json({ error: 'La edad debe ser un número válido entre 18 y 120' });
    }

    // Validar el formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(correu_electronic)) {
        return res.status(400).json({ error: 'El correo electrónico no tiene un formato válido' });
    }

    const nuevoUsuario = { nom, cognom, edat, contrasenya, correu_electronic };

    Usuario.create(nuevoUsuario, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Usuario creado con éxito', usuarioId: results.insertId });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Tots els camps són obligatoris' });
    }

    Usuario.findByEmail(email, (err, usuario) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!usuario) {
            return res.status(401).json({ error: 'Usuari no trobat' });
        }

        if (usuario.contrasenya !== password) {
            return res.status(401).json({ error: 'Contrasenya incorrecta' });
        }

        res.json({
            message: 'Login correcte',
            usuari: {
                id: usuario.id,
                nom: usuario.nom,
                email: usuario.correu_electronic
            }
        });
    });
});


module.exports = router;
