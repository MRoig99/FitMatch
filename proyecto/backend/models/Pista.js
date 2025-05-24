const connection = require('../db');

const Pista = {
    getDisponibles: (idUbicacio, idEsport, data, callback) => {
        const query = `
            SELECT p.id, p.nom, p.preu_total, p.data, p.disponibilitat, p.hora
        FROM Pista p
        WHERE p.idUbicacio = ? AND p.idEsport = ? AND p.data = ? AND p.disponibilitat = TRUE
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
    },
    
    getReservadesActives: (ciutat, idEsport, data, callback) => {
        const query = `
      SELECT DISTINCT p.id, p.nom, p.preu_total, p.jugadors_necessaris, p.hora,
             u.nom AS nom_ubicacio, u.direccio
      FROM Pista p
      JOIN Ubicacio u ON p.idUbicacio = u.id
      JOIN Reserva r ON r.id_pista = p.id
      WHERE p.disponibilitat = FALSE
        AND p.idEsport = ?
        AND u.ciutat = ?
        AND r.data_reserva = ?
        AND r.id_estat_reserva = 1
    `;
        connection.query(query, [idEsport, ciutat, data], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }

};

module.exports = Pista;
