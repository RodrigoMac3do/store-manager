const connection = require('./connection');

const listAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

module.exports = {
  listAll,
};
