const connection = require('../db');

const Reserva = {
    getAll: (callback) => {
        connection.query('SELECT * FROM reserva', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getById: (id, callback) => {
        connection.query('SELECT * FROM reserva WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    getByPartit: (idPartit, callback) => {
        const query = 'SELECT * FROM reserva WHERE id_partit = ? AND estat = "confirmada"';
        connection.query(query, [idPartit], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    updateEstado: (estat, idReserva, callback) => {
        connection.query('UPDATE reserva SET estat = ? WHERE id = ?', [estat, idReserva], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },

    create: (reserva, callback) => {
        const { id_usuari, id_partit, id_pista, id_estat_reserva, data_reserva, hora } = reserva;
        const query = 'INSERT INTO reserva (id_usuari, id_partit, id_pista, id_estat_reserva, data_reserva, hora) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(query, [id_usuari, id_partit, id_pista, id_estat_reserva, data_reserva, hora], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Reserva;
