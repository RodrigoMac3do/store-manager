const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.products.listAll);

module.exports = router;
