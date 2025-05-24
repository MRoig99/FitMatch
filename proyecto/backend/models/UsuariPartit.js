const connection = require('../db');

const UsuariPartit = {
    getAll: (callback) => {
        connection.query('SELECT * FROM usuari_partit', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getByPartido: (id_partit, callback) => {
        connection.query('SELECT * FROM usuari_partit WHERE id_partit = ?', [id_partit], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getByUsuario: (id_usuari, callback) => {
        connection.query('SELECT * FROM usuari_partit WHERE id_usuari = ?', [id_usuari], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    create: (usuariPartit, callback) => {
        const { id_usuari, id_partit } = usuariPartit;
        const query = 'INSERT INTO usuari_partit (id_usuari, id_partit) VALUES (?, ?)';
        connection.query(query, [id_usuari, id_partit], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        connection.query('DELETE FROM usuari_partit WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = UsuariPartit;
