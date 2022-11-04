const connection = require('./connection');

const listAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';

  const [products] = await connection.execute(query);

  return products;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';

  const [product] = await connection.execute(query, [id]);

  return product;
};

const insert = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';

  const [{ insertId }] = await connection.execute(query, [name]);

  return insertId;
};

const updateById = async (id, name) => {
  const query = `
UPDATE
  StoreManager.products
SET
  name = ?
WHERE
  id = ?
`;

  await connection.execute(query, [name, id]);
};

module.exports = {
  listAll,
  findById,
  insert,
  updateById,
};
