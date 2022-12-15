const express = require('express');
require('express-async-errors');
const router = require('./routers');
const middleware = require('./middlewares');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', router.products);

app.use('/sales', router.sales);

app.use(middleware.httpError);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação

module.exports = app;
