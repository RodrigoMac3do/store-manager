const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.sales.listAll);
router.get('/:id', controller.sales.findById);

module.exports = router;
