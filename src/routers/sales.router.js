const express = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');

const router = express.Router();

router.get('/', controller.sales.listAll);
router.get('/:id', controller.sales.findById);
router.post(
  '/',
  middleware.quantity,
  middleware.product,
  controller.sales.insert,
);

module.exports = router;
