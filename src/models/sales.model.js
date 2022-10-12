const connection = require('./connection');

const listAll = async () => {
  const query = 'SELECT * FROM StoreManager.sales';

  const [sales] = await connection.execute(query);
  
  return sales;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.sales WHERE id = ?';

  const [[product]] = await connection.execute(query, [id]);

  return product;
};

module.exports = {
  listAll,
  findById,
};
