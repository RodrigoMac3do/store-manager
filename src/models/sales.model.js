const connection = require('./connection');

const listAll = async () => {
  const query = 'SELECT * FROM StoreManager.sales';

  const [sales] = await connection.execute(query);
  
  return sales;
};

module.exports = {
  listAll,
};
