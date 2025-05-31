const express = require('express');
const router = express.Router();
const partitController = require('../controllers/partitController');

router.get('/', partitController.getAll);
router.get('/:id', partitController.getById);
router.post('/', partitController.create);
router.get('/pista/:id', partitController.getByPista);
router.post('/:id/incrementParticipants', partitController.incrementParticipants);
router.post('/:id/decrementParticipants', partitController.decrementParticipants);
router.get('/historial/:idUsuari', partitController.getHistorialUsuari);
router.get('/creados/:idUsuari', partitController.getPartidosCreados);
router.get('/mis-partidos/:idUsuari', partitController.getMisPartidos);
router.patch('/:id', partitController.updEstat);
router.use((req, res, next) => {
  console.log(`Petición recibida en /partits ${req.method} ${req.path}`);
  next();
});

module.exports = router;
