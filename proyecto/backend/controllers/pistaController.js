const Pista = require('../models/Pista');

exports.getPistasDisponibles = (req, res) => {
    const { idUbicacio, idEsport, data } = req.query;

    if (!idUbicacio || !idEsport || !data) {
        return res.status(400).json({ error: 'Falten paràmetres: idUbicacio, idEsport, data' });
    }

    Pista.getDisponibles(idUbicacio, idEsport, data, (err, pistas) => {
        if (err) {
            console.error('Error al obtenir pistes disponibles:', err);
            return res.status(500).json({ error: 'Error intern del servidor' });
        }
        res.json(pistas);
    });
};
