const connection = require('./connection');

const findAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';

  const [products] = await connection.execute(query);

  return products;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE  id = ?';

  const [[product]] = await connection.execute(query, [id]);

  return product;
};

const findByTerm = async (q) => {
  const query = `SELECT * FROM StoreManager.products WHERE name LIKE '%${q}%'`;

  const [product] = await connection.execute(query);

  return product;
};

const create = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';

  const [{ insertId }] = await connection.execute(query, [name]);

  return insertId;
};

const updateById = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';

  await connection.execute(query, [name, id]);

  return findById(id);
};

const remove = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';

  await connection.execute(query, [id]);
};

module.exports = {
  findAll,
  findById,
  findByTerm,
  create,
  updateById,
  remove,
};
