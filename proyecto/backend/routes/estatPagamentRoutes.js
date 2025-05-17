const express = require('express');
const router = express.Router();
const estatPagamentController = require('../controllers/estatPagamentController');

router.get('/', estatPagamentController.getAll);
router.get('/:id', estatPagamentController.getById);
router.post('/', estatPagamentController.create);

module.exports = router;
