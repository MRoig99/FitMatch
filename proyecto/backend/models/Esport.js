const connection = require('../db');

const Esport = {
    getAll: (callback) => {
        connection.query('SELECT * FROM esport', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getById: (id, callback) => {
        connection.query('SELECT * FROM esport WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    create: (esport, callback) => {
        const { nom } = esport;
        const query = 'INSERT INTO esport (nom) VALUES (?)';
        connection.query(query, [nom], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Esport;
