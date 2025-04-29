const connection = require('../db');

// Crear el modelo para la tabla Esport
const Esport = {
    // Método para obtener todos los deportes
    getAll: (callback) => {
        connection.query('SELECT * FROM Esport', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Método para obtener un deporte por ID
    getById: (id, callback) => {
        connection.query('SELECT * FROM Esport WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    // Método para crear un nuevo deporte
    create: (esport, callback) => {
        const { nom } = esport;
        const query = 'INSERT INTO Esport (nom) VALUES (?)';
        connection.query(query, [nom], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Esport;
