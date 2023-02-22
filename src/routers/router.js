const { Router } = require('express');
const routes = require('./index');

const router = Router();

router.use('/products', routes.products);

router.use('/sales', routes.sales);

module.exports = router;
