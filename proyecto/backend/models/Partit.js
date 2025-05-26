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

    // Obtener un partido por id_pista (nueva ruta)
    getByPista: (id_pista, callback) => {
        const query = 'SELECT * FROM partit WHERE id_pista = ?';
        connection.query(query, [id_pista], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0] || null);
        });
    },

    incrementParticipants: (id_partit, callback) => {
        const sql = 'UPDATE partit SET participants = participants + 1 WHERE id = ?';
        connection.query(sql, [id_partit], (err, results) => {
            if (err) return callback(err);
            callback(null);
        });
    },


    // Método para crear un nuevo partido
    create: (partit, callback) => {
        const { id_usuari_creador, id_esport, id_pista, nom, data_creacio, participants, preu, descripcio } = partit;
        const query = 'INSERT INTO partit (id_usuari_creador, id_esport, id_pista, nom, data_creacio, participants, preu, descripcio) VALUES(?, ?, ?, ?, ?, ?, ?, ?); ';
        connection.query(query, [id_usuari_creador, id_esport, id_pista, nom, data_creacio, participants, preu, descripcio], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

};

module.exports = Partit;
