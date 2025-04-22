const connection = require('../db');

// Crear el modelo para la tabla Estat_partit
const Estat_partit = {
    // Método para obtener todos los estados de partido
    getAll: (callback) => {
        connection.query('SELECT * FROM Estat_partit', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Método para obtener un estado de partido por ID
    getById: (id, callback) => {
        connection.query('SELECT * FROM Estat_partit WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    // Método para crear un nuevo estado de partido
    create: (estatPartit, callback) => {
        const { id_partit, nom } = estatPartit;
        const query = 'INSERT INTO Estat_partit (id_partit, nom) VALUES (?, ?)';
        connection.query(query, [id_partit, nom], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Estat_partit;
