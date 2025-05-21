const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getAll);
router.get('/:id', usuarioController.getById);
router.get('/email/:email', usuarioController.findByEmail);
router.post('/', usuarioController.create);
router.post('/login', usuarioController.login);

module.exports = router;
