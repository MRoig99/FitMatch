const connection = require('../db');

// Crear el modelo para la tabla Equip
const Equip = {
    // Método para obtener todos los equipos
    getAll: (callback) => {
        connection.query('SELECT * FROM Equip', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Método para obtener un equipo por ID
    getById: (id, callback) => {
        connection.query('SELECT * FROM Equip WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    // Método para crear un nuevo equipo
    create: (equip, callback) => {
        const { id_partit, nom, jugadors, num_jugadors } = equip;
        const query = 'INSERT INTO Equip (id_partit, nom, jugadors, num_jugadors) VALUES (?, ?, ?, ?)';
        connection.query(query, [id_partit, nom, jugadors, num_jugadors], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Equip;
