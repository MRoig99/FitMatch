const connection = require('../db');

// Crear el modelo para la tabla Partit
const Partit = {
    // Método para obtener todos los partidos
    getAll: (callback) => {
        connection.query('SELECT * FROM Partit', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Método para obtener un partido por su id
    getById: (id, callback) => {
        connection.query('SELECT * FROM Partit WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    // Método para crear un nuevo partido
    create: (partit, callback) => {
        const { id_usuari_creador, id_esport, id_ubicacio, nom, data, maxim_participants, data_creacio, participants, preu, descripcio } = partit;
        const query = 'INSERT INTO Partit (id_usuari_creador, id_esport, id_ubicacio, nom, data, maxim_participants, data_creacio, participants, preu, descripcio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [id_usuari_creador, id_esport, id_ubicacio, nom, data, maxim_participants, data_creacio, participants, preu, descripcio], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Partit;
