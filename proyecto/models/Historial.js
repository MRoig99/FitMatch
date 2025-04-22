const connection = require('../db');

// Crear el modelo para la tabla Historial
const Historial = {
    // Método para obtener todos los registros
    getAll: (callback) => {
        connection.query('SELECT * FROM Historial', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Método para obtener un historial por ID
    getById: (id, callback) => {
        connection.query('SELECT * FROM Historial WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    // Método para crear un nuevo historial
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
