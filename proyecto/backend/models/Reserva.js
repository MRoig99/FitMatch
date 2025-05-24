const connection = require('../db');

const Reserva = {
    getAll: (callback) => {
        connection.query('SELECT * FROM Reserva', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getById: (id, callback) => {
        connection.query('SELECT * FROM Reserva WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    create: (reserva, callback) => {   
        const { id_usuari, id_partit, id_pista, id_estat_reserva, data_reserva, hora } = reserva;
        const query = 'INSERT INTO Reserva (id_usuari, id_partit, id_pista, id_estat_reserva, data_reserva, hora) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(query, [id_usuari, id_partit, id_pista, id_estat_reserva, data_reserva, hora], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Reserva;
