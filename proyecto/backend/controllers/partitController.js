// controllers/partitController.js
const Partit = require('../models/Partit');

const partitController = {
  // GET /partits
  getAll: (req, res) => {
    Partit.getAll((err, partits) => {
      if (err) return res.status(500).json({ error: 'Error al obtenir els partits.' });
      res.json(partits);
    });
  },

  // GET /partits/:id
  getById: (req, res) => {
    const id = req.params.id;
    Partit.getById(id, (err, partit) => {
      if (err) return res.status(500).json({ error: 'Error al obtenir el partit.' });
      if (!partit) return res.status(404).json({ message: 'Partit no trobat.' });
      res.json(partit);
    });
  },

  // GET /partits/pista/:id
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

  // POST /partits
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
