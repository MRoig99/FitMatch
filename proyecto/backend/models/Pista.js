const connection = require('../db');

const Pista = {
    // Obtenir pistes disponibles per ubicació, esport i data, incloent preu i jugadors
    getDisponibles: (idUbicacio, idEsport, data, callback) => {
        const query = `
            SELECT p.id, p.nom, p.preu_total, p.jugadors_necessaris
            FROM Pista p
            WHERE p.idUbicacio = ? AND p.idEsport = ?
            AND p.id NOT IN (
                SELECT rp.idPista
                FROM ReservaPista rp
                WHERE rp.data = ?
            )
        `;
        connection.query(query, [idUbicacio, idEsport, data], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Pista;
