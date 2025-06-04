const connection = require('../db');

const Pagos = {
    getAll: (callback) => {
        connection.query('SELECT * FROM pagos', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getById: (id, callback) => {
        connection.query('SELECT * FROM pagos WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    create: (pago, callback) => {
        const { id_reserva, total, data_pagament, metode_pagament, comisio } = pago;
        const query = 'INSERT INTO pagos (id_reserva, total, data_pagament, metode_pagament, comisio) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [id_reserva, total, data_pagament, metode_pagament, comisio], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Pagos;
