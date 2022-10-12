const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.products.listAll);
router.get('/:id', controller.products.findById);

module.exports = router;
