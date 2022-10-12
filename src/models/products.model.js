const connection = require('./connection');

const listAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';

  const [products] = await connection.execute(query);
  
  return products;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  
  const [[product]] = await connection.execute(query, [id]);

  return product;
};

module.exports = {
  listAll,
  findById,
};
