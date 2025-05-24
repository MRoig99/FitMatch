const express = require('express');
const router = express.Router();
const usuariPartitController = require('../controllers/usuariPartitController');

router.post('/', usuariPartitController.create);

router.get('/partit/:id_partit', usuariPartitController.getByPartido);

router.get('/usuari/:id_usuari', usuariPartitController.getByUsuario);

router.delete('/:id', usuariPartitController.delete);

module.exports = router;
