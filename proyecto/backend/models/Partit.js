const connection = require('../db');

// Crear el modelo para la tabla Partit
const Partit = {
    getAll: (callback) => {
        connection.query('SELECT * FROM Partit', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getById: (id, callback) => {
        connection.query('SELECT * FROM Partit WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

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

    decrementParticipants: (id_partit, callback) => {
        const sql = 'UPDATE partit SET participants = participants - 1 WHERE id = ?';
        connection.query(sql, [id_partit], (err, results) => {
            if (err) return callback(err);
            callback(null);
        });
    },

    getHistorialUsuari: (idUsuari) => {
        return new Promise((resolve, reject) => {
            const sql = `
      SELECT DISTINCT
        p.id,
        p.nom,
        p.data_creacio    AS fecha,
        p.resultat        AS resultado,
        e.nom             AS deporte,
        ps.nom            AS pista,
        u.nom             AS ubicacio
      FROM partit p
      JOIN esport e        ON p.id_esport    = e.id
      JOIN pista ps        ON p.id_pista     = ps.id
      JOIN ubicacio u      ON ps.idUbicacio = u.id
      JOIN usuari_partit up ON p.id          = up.id_partit
      WHERE up.id_usuari   = ?
        AND p.estat       = 'finalizado'
      ORDER BY p.data_creacio DESC;
    `;
            connection.query(sql, [idUsuari], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },


    getPartidosCreados: (idUsuari) => {
        return new Promise((resolve, reject) => {
            const sql = `
      SELECT 
        p.id, p.nom, p.id_pista, p.id_usuari_creador, p.data_creacio AS fecha, p.resultat AS resultado, 
        e.nom AS deporte, ps.nom AS pista, u.nom AS ubicacio, p.estat
      FROM partit p
      JOIN esport e ON p.id_esport = e.id
      JOIN pista ps ON p.id_pista = ps.id
      JOIN ubicacio u ON ps.idUbicacio = u.id
      WHERE p.id_usuari_creador = ? AND p.estat = 'pendent'
      ORDER BY p.data_creacio DESC;
    `;
            connection.query(sql, [idUsuari], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    getPartidosPendientesUsuario: (idUsuari) => {
        return new Promise((resolve, reject) => {
            const sql = `
      SELECT
        p.id,
        p.nom,
        p.id_usuari_creador,
        p.id_pista,
        p.data_creacio AS fecha,
        p.resultat AS resultado,
        p.estat,
        e.nom AS deporte,
        ps.nom AS pista,
        u.nom AS ubicacio
      FROM partit p
      JOIN esport e ON p.id_esport = e.id
      JOIN pista ps ON p.id_pista = ps.id
      JOIN ubicacio u ON ps.idUbicacio = u.id
      JOIN usuari_partit up ON p.id = up.id_partit
      WHERE up.id_usuari = ?
        AND p.id_usuari_creador != ?
        AND p.estat = 'pendent'
      ORDER BY p.data_creacio DESC;
    `;
            connection.query(sql, [idUsuari, idUsuari], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },


    updateEstat: (estat, resultat, idPartit, callback) => {
        const updates = [];
        const values = [];
        console.log("HOLAA");

        if (estat !== undefined) {
            updates.push('estat = ?');
            values.push(estat);
        }
        if (resultat !== undefined) {
            updates.push('resultat = ?');
            values.push(resultat);
        }
        if (updates.length === 0) {
            return callback(new Error('Hay que enviar al menos "estat" o "resultat"'), null);
        }
        const sql = `UPDATE partit SET ${updates.join(', ')} WHERE id = ?`;
        values.push(idPartit);
        connection.query(sql, values, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },

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
