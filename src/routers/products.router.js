const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.products.findAll);

router.get('/search', controller.products.findByTerm);

router.get('/:id', controller.products.findById);

router.post('/', controller.products.create);

router.put('/:id', controller.products.updateById);

router.delete('/:id', controller.products.remove);

module.exports = router;
