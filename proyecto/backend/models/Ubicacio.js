const connection = require('../db');

const Ubicacio = {
    getAll: (callback) => {
        connection.query('SELECT * FROM ubicacio', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getById: (id, callback) => {
        connection.query('SELECT * FROM ubicacio WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    create: (ubicacion, callback) => {
        const { nom, direccio, ciutat, telefon } = ubicacion;
        const query = 'INSERT INTO ubicacio (nom, direccio, ciutat, telefon) VALUES (?, ?, ?, ?)';
        connection.query(query, [nom, direccio, ciutat, telefon], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Ubicacio;
