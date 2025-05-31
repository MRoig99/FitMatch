const Partit = require('../models/Partit');

const partitController = {
  getAll: (req, res) => {
    Partit.getAll((err, partits) => {
      if (err) return res.status(500).json({ error: 'Error al obtenir els partits.' });
      res.json(partits);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Partit.getById(id, (err, partit) => {
      if (err) return res.status(500).json({ error: 'Error al obtenir el partit.' });
      if (!partit) return res.status(404).json({ message: 'Partit no trobat.' });
      res.json(partit);
    });
  },

  getByPista: (req, res) => {
    const pistaId = req.params.id;
    Partit.getByPista(pistaId, (err, partit) => {
      if (err) return res.status(500).json({ error: 'Error al obtenir el partit per pista.' });
      if (!partit) return res.status(404).json({ message: 'No s’ha trobat cap partit per a aquesta pista.' });
      res.json(partit);
    });
  },

  incrementParticipants: (req, res) => {
    const id_partit = req.params.id;
    Partit.incrementParticipants(id_partit, (err, result) => {
      if (err) {
        console.error('Error incrementant participants:', err);
        return res.status(500).json({ error: 'Error incrementant participants.' });
      }
      res.json({ message: 'Participants incrementats correctament.' });
    });
  },
  
  decrementParticipants: (req, res) => {
    const id_partit = req.params.id;
    Partit.decrementParticipants(id_partit, (err, result) => {
      if (err) {
        console.error('Error decrementant participants:', err);
        return res.status(500).json({ error: 'Error decrementant participants.' });
      }
      res.json({ message: 'Participants decrementats correctament.' });
    });
  },

  getHistorialUsuari: async (req, res) => {
    const idUsuari = req.params.idUsuari;
    try {
      const partits = await Partit.getHistorialUsuari(idUsuari);
      res.json(partits);
    } catch (error) {
      console.error('Error obteniendo historial usuario:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  },

  updEstat: (req, res) => {
    const idPartit = req.params.id;
    const { estat, resultat } = req.body;

    Partit.updateEstat(estat,resultat, idPartit, (err, result) => {
      if (err) {
        console.error('Error actualitzant estat partit:', err);
        return res.status(500).json({ error: 'Error actualitzant estat partit' });
      }
      res.json({ message: 'Estat del partit actualitzat correctament' });
    });
  },

  getPartidosCreados: async (req, res) => {
    const idUsuari = req.params.idUsuari;
    try {
      const partits = await Partit.getPartidosCreados(idUsuari);
      res.json(partits);
    } catch (error) {
      console.error('Error obteniendo partidos creados:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  },

  getMisPartidos: async (req, res) => {
    const idUsuari = req.params.idUsuari;
    try {
      const creados = await Partit.getPartidosCreados(idUsuari);
      const unidos = await Partit.getPartidosPendientesUsuario(idUsuari);

      const todos = [...creados, ...unidos];
      res.json(todos);
    } catch (error) {
      console.error('Error obteniendo Mis partidos:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  },

  create: (req, res) => {
    const nouPartit = req.body;
    console.log('Dades per crear partit:', nouPartit);
    Partit.create(nouPartit, (err, resultat) => {
      if (err) {
        console.error('Error al crear partit:', err);
        return res.status(500).json({ error: 'Error al crear el partit.', details: err.message });
      }
      res.status(201).json({ message: 'Partit creat correctament', id: resultat.insertId });
    });
  }
};

module.exports = partitController;
