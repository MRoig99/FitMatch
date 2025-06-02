const connection = require('../db');

const Usuario = {
    getAll: (callback) => {
        connection.query('SELECT * FROM usuarios', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getById: (id, callback) => {
        connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    create: (usuario, callback) => {
        const { nom, cognom, edat, contrasenya, correu_electronic } = usuario;
        const query = 'INSERT INTO usuarios (nom, cognom, edat, contrasenya, correu_electronic) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [nom, cognom, edat, contrasenya, correu_electronic], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM usuarios WHERE correu_electronic = ? LIMIT 1';
        connection.query(query, [email], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length === 0) {
                return callback(null, null);
            }
            callback(null, results[0]);
        });
    }
};

module.exports = Usuario;
