const connection = require('../db');

const Pista = {
    getDisponibles: (idUbicacio, idEsport, data, callback) => {
        const query = `
            SELECT p.id, p.nom, p.preu_total, p.data, p.disponibilitat, p.hora
            FROM Pista p
            WHERE p.idUbicacio = ? AND p.idEsport = ? AND p.data = ? AND p.disponibilitat = TRUE
            AND p.id NOT IN (
                SELECT rp.idPista
                FROM ReservaPista rp
                WHERE rp.data = ?
            )
        `;
        connection.query(query, [idUbicacio, idEsport, data, data], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    updateDisponibilitat: (id, disponibilitat, callback) => {
        const query = 'UPDATE pista SET disponibilitat = ? WHERE id = ?';
        connection.query(query, [disponibilitat, id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    }
};

module.exports = Pista;
