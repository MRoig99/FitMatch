const express = require('express');
const router = express.Router();
const equipController = require('../controllers/equipController');

router.get('/', equipController.getAll);
router.get('/:id', equipController.getById);
router.post('/', equipController.create);

module.exports = router;
