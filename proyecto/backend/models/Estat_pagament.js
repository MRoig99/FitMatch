const connection = require('../db');

const Estat_pagament = {
    getAll: (callback) => {
        connection.query('SELECT * FROM Estat_pagament', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getById: (id, callback) => {
        connection.query('SELECT * FROM Estat_pagament WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    create: (estatPagament, callback) => {
        const { id_pagament, nom } = estatPagament;
        const query = 'INSERT INTO Estat_pagament (id_pagament, nom) VALUES (?, ?)';
        connection.query(query, [id_pagament, nom], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Estat_pagament;
