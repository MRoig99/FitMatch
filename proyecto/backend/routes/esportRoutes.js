const express = require('express');
const router = express.Router();
const esportController = require('../controllers/esportController');

router.get('/', esportController.getAll);
router.get('/:id', esportController.getById);
router.post('/', esportController.create);

module.exports = router;
