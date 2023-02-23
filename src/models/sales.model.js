const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const query = `
  SELECT
    *
  FROM
    StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS s_p ON s_p.sale_id = s.id
 `;

  const [sales] = await connection.execute(query);

  return camelize(sales);
};

const findById = async (id) => {
  const query = `
  SELECT
    s.date,
    s_p.product_id,
    s_p.quantity
  FROM
    StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS s_p ON s_p.sale_id = s.id
  WHERE 
    sale_id = ?
  `;

  const [sale] = await connection.execute(query, [id]);

  return camelize(sale);
};

const createSale = async () => {
  const newSale = 'INSERT INTO StoreManager.sales () VALUES ()';

  const [{ insertId }] = await connection.execute(newSale);

  return insertId;
};

const create = async ({ productId, quantity, id }) => {
  const insertProduct = `
  INSERT INTO StoreManager.sales_products 
    (product_id, quantity, sale_id)
  VALUES
    (?, ?, ?)
  `;

  await connection.execute(insertProduct, [productId, quantity, id]);
};

const updateById = async (id, lista) => {
  const { productId, quantity } = lista;

  const query = `
  UPDATE
    StoreManager.sales_products
  SET
    quantity = ?
  WHERE
    sale_id = ?
  AND 
    product_id = ?
  `;

  await connection.execute(query, [quantity, id, productId]);
};

const remove = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';

  await connection.execute(query, [id]);
};

module.exports = {
  findAll,
  findById,
  createSale,
  create,
  updateById,
  remove,
};
