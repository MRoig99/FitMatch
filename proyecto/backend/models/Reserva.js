const connection = require('../db');

// Crear el modelo para la tabla Reserva
const Reserva = {
    // Método para obtener todas las reservas
    getAll: (callback) => {
        connection.query('SELECT * FROM Reserva', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Método para obtener una reserva por su id
    getById: (id, callback) => {
        connection.query('SELECT * FROM Reserva WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    // Método para crear una nueva reserva
    create: (reserva, callback) => {
        const { id_usuari, id_partit, data_reserva } = reserva;
        const query = 'INSERT INTO Reserva (id_usuari, id_partit, data_reserva) VALUES (?, ?, ?)';
        connection.query(query, [id_usuari, id_partit, data_reserva], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Reserva;
