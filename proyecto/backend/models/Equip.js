const connection = require('../db');

const Equip = {
    getAll: (callback) => {
        connection.query('SELECT * FROM equip', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getById: (id, callback) => {
        connection.query('SELECT * FROM equip WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    create: (equip, callback) => {
        const { id_partit, nom, jugadors, num_jugadors } = equip;
        const query = 'INSERT INTO equip (id_partit, nom, jugadors, num_jugadors) VALUES (?, ?, ?, ?)';
        connection.query(query, [id_partit, nom, jugadors, num_jugadors], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Equip;
