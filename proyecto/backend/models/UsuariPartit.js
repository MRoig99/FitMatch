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

    getByUsuarioAndPartit: (id_usuari, id_partit, callback) => {
        const sql = 'SELECT * FROM usuari_partit WHERE id_usuari = ? AND id_partit = ?';
        connection.query(sql, [id_usuari, id_partit], (err, results) => {
            if (err) return callback(err, null);
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

    deleteByUsuariAndPartit: (idUsuari, idPartit, callback) => {
        const sql = 'DELETE FROM usuari_partit WHERE id_usuari = ? AND id_partit = ?';
        connection.query(sql, [idUsuari, idPartit], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = UsuariPartit;
