const connection = require('../db');

// Crear el modelo para la tabla Estat_pagament
const Estat_pagament = {
    // Método para obtener todos los estados de pago
    getAll: (callback) => {
        connection.query('SELECT * FROM Estat_pagament', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Método para obtener un estado de pago por ID
    getById: (id, callback) => {
        connection.query('SELECT * FROM Estat_pagament WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    // Método para crear un nuevo estado de pago
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
