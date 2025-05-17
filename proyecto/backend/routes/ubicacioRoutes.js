const express = require('express');
const router = express.Router();
const ubicacioController = require('../controllers/ubicacioController');

router.get('/', ubicacioController.getAll);
router.get('/:id', ubicacioController.getById);
router.post('/', ubicacioController.create);

module.exports = router;
