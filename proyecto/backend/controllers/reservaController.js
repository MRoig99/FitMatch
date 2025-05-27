const Reserva = require('../models/Reserva');
const Pista = require('../models/Pista');

const reservaController = {
  getAll: (req, res) => {
    Reserva.getAll((err, reserves) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtenir les reserves.' });
      }
      res.json(reserves);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;

    Reserva.getById(id, (err, reserva) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtenir la reserva.' });
      }
      if (!reserva) {
        return res.status(404).json({ message: 'Reserva no trobada.' });
      }
      res.json(reserva);
    });
  },

  getByPartit: (req, res) => {
    const idPartit = req.params.idPartit;
    Reserva.getByPartit(idPartit, (err, reserves) => {
      if (err) {
        console.error('Error obtenint reserves per partit:', err);
        return res.status(500).json({ error: 'Error intern del servidor' });
      }
      res.json(reserves);
    });
  },

  create: (req, res) => {
    const novaReserva = req.body;
    Reserva.create(novaReserva, (err, resultat) => {
      if (err) {
        return res.status(500).json({ error: 'Error al crear la reserva.' });
      }
      res.status(201).json({ message: 'Reserva creada correctament', id: resultat.insertId });
    });
  },

  updDisponibilitat: (req, res) => { 
    const idReserva = req.params.id; 
    const { disponibilitat } = req.body;

    
    Reserva.getById(idReserva, (err, reserva) => {
      if (err) {
        console.error('Error obtenint reserva:', err);
        return res.status(500).json({ error: 'Error intern del servidor' });
      }
      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no trobada' });
      }

      Pista.updateDisponibilitat(reserva.id_pista, false, (err2) => {
        if (err2) {
          console.error('Error actualitzant disponibilitat:', err2);
          return res.status(500).json({ error: 'Error actualitzant disponibilitat' });
        }
        
        const nouEstat = disponibilitat === false ? 'cancelada' : reserva.estat;

        Reserva.updateEstado(nouEstat, idReserva, (err3) => {
          if (err3) {
            console.error('Error actualitzant estat reserva:', err3);
            return res.status(500).json({ error: 'Error actualitzant estat reserva' });
          }

          res.json({ message: 'Disponibilitat actualitzada i reserva actualitzada correctament' });
        });
      });
    });
  }
};

module.exports = reservaController;
