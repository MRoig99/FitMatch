const connection = require('../db');

// Crear el modelo para la tabla Usuario
const Usuario = {
    // Método para obtener todos los usuarios
    getAll: (callback) => {
        connection.query('SELECT * FROM usuarios', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Método para obtener un usuario por su id
    getById: (id, callback) => {
        connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    // Método para crear un nuevo usuario
    create: (usuario, callback) => {
        const { nom, cognom, edat, contrasenya, correu_electronic } = usuario;
        const query = 'INSERT INTO usuarios (nom, cognom, edat, contrasenya, correu_electronic) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [nom, cognom, edat, contrasenya, correu_electronic], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Usuario;
