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

exports.updateDisponibilitat = (req, res) => {
  const id = req.params.id;
  const { disponibilitat } = req.body;

  if (disponibilitat === undefined) {
    return res.status(400).json({ error: 'Falta el camp disponibilitat' });
  }

  Pista.updateDisponibilitat(id, disponibilitat, (err) => {
    if (err) {
      console.error('Error actualitzant disponibilitat:', err);
      return res.status(500).json({ error: 'Error actualitzant disponibilitat' });
    }
    res.json({ message: 'Disponibilitat actualitzada correctament.' });
  });
};

exports.getPistesReservadesActives = (req, res) => {
  const { ciutat, idEsport, data } = req.query;

  if (!ciutat || !idEsport || !data) {
    return res.status(400).json({ error: 'Falten paràmetres: ciutat, idEsport i data' });
  }

  Pista.getReservadesActives(ciutat, idEsport, data, (err, resultats) => {
    if (err) {
      console.error('Error obtenint pistes reservades actives:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }
    res.json(resultats);
  });
};
