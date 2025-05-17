const express = require('express');
const router = express.Router();
const estatPartitController = require('../controllers/estatPartitController');

router.get('/', estatPartitController.getAll);
router.get('/:id', estatPartitController.getById);
router.post('/', estatPartitController.create);

module.exports = router;
