const express = require('express');
const router = express.Router();
const partitController = require('../controllers/partitController');

router.get('/', partitController.getAll);
router.get('/:id', partitController.getById);
router.post('/', partitController.create);

module.exports = router;
