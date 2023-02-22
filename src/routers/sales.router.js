const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.sales.findAll);

router.get('/:id', controller.sales.findById);

router.post('/', controller.sales.insert);

router.put('/:id', controller.sales.updateById);

router.delete('/:id', controller.sales.remove);

module.exports = router;
