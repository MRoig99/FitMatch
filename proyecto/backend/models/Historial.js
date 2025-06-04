const connection = require('../db');

const Historial = {
    getAll: (callback) => {
        connection.query('SELECT * FROM Historial', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getById: (id, callback) => {
        connection.query('SELECT * FROM Historial WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    create: (historial, callback) => {
        const { id_usuari, id_partit, resultat } = historial;
        const query = 'INSERT INTO Historial (id_usuari, id_partit, resultat) VALUES (?, ?, ?)';
        connection.query(query, [id_usuari, id_partit, resultat], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Historial;
