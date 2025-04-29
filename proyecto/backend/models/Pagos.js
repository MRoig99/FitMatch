const connection = require('../db');

// Crear el modelo para la tabla Pagos
const Pagos = {
    // Método para obtener todos los pagos
    getAll: (callback) => {
        connection.query('SELECT * FROM Pagos', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Método para obtener un pago por ID
    getById: (id, callback) => {
        connection.query('SELECT * FROM Pagos WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    // Método para crear un nuevo pago
    create: (pago, callback) => {
        const { id_reserva, total, data_pagament, metode_pagament, comisio } = pago;
        const query = 'INSERT INTO Pagos (id_reserva, total, data_pagament, metode_pagament, comisio) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [id_reserva, total, data_pagament, metode_pagament, comisio], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Pagos;
