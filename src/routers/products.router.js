const express = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');

const router = express.Router();

router.get('/', controller.products.findAll);

router.get('/:id', controller.products.findById);

router.post('/', middleware.name, controller.products.insert);

router.put('/:id', middleware.nameProducts, controller.products.updateById);

router.delete('/:id', controller.products.remove);

module.exports = router;
