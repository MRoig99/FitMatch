const connection = require('../db');

// Crear el modelo para la tabla Ubicacio
const Ubicacio = {
    // Método para obtener todas las ubicaciones
    getAll: (callback) => {
        connection.query('SELECT * FROM Ubicacio', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Método para obtener una ubicación por ID
    getById: (id, callback) => {
        connection.query('SELECT * FROM Ubicacio WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    // Método para crear una nueva ubicación
    create: (ubicacion, callback) => {
        const { nom, direccio, ciutat, telefon } = ubicacion;
        const query = 'INSERT INTO Ubicacio (nom, direccio, ciutat, telefon) VALUES (?, ?, ?, ?)';
        connection.query(query, [nom, direccio, ciutat, telefon], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Ubicacio;
