const connection = require('../db');

// Crear el modelo para la tabla Estat_reserva
const Estat_reserva = {
    // Método para obtener todos los estados de reserva
    getAll: (callback) => {
        connection.query('SELECT * FROM Estat_reserva', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Método para obtener un estado de reserva por ID
    getById: (id, callback) => {
        connection.query('SELECT * FROM Estat_reserva WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    // Método para crear un nuevo estado de reserva
    create: (estatReserva, callback) => {
        const { id_reserva, nom } = estatReserva;
        const query = 'INSERT INTO Estat_reserva (id_reserva, nom) VALUES (?, ?)';
        connection.query(query, [id_reserva, nom], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Estat_reserva;
