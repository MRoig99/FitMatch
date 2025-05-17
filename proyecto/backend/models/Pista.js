const connection = require('../db');

const Pista = {
    getDisponibles: (idUbicacio, idEsport, data, callback) => {
        const query = `
            SELECT p.id, p.nom, p.preu_total, p.jugadors_necessaris, p.data, p.disponibilitat
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
};

module.exports = Pista;
