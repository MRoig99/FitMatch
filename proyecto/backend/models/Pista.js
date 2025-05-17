const connection = require('../db');

const Pista = {
    // Obtener pistas disponibles por ubicación, deporte y fecha
    getDisponibles: (idUbicacio, idEsport, data, callback) => {
        const query = `
            SELECT p.id, p.nom
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
