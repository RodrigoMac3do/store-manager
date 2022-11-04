const connection = require('./connection');

const listAll = async () => {
  const query = `
SELECT
  s_p.sale_id AS saleId,
  s.date,
  s_p.product_id AS productId,
  s_p.quantity
FROM
  StoreManager.sales AS s
  INNER JOIN StoreManager.sales_products AS s_p ON s_p.sale_id = s.id
ORDER BY
  sale_id ASC,
  product_id ASC
`;

  const [sales] = await connection.execute(query);

  return sales;
};

const findById = async (id) => {
  const query = `
SELECT
  s.date,
  s_p.product_id AS productId,
  s_p.quantity
FROM
  StoreManager.sales AS s
  INNER JOIN StoreManager.sales_products AS s_p ON s_p.sale_id = s.id
WHERE sale_id = ?
ORDER BY
  sale_id ASC,
  product_id ASC
`;

  const [sale] = await connection.execute(query, [id]);

  return sale;
};

const insert = async (produtos) => {
  const insertSale = 'INSERT INTO StoreManager.sales () VALUES ()';

  const [{ insertId }] = await connection.execute(insertSale);

  const insertProduct = `
INSERT INTO StoreManager.sales_products
  (product_id, quantity, sale_id)
VALUES
  ?
`;

  const arrayProdutos = produtos.map((produto) => [
    produto.productId,
    produto.quantity,
    insertId,
  ]);
  
  await connection.query(insertProduct, [arrayProdutos]);

  return insertId;
};

const remove = async (id) => {
  const query = `
DELETE FROM
  StoreManager.sales
WHERE
  id = ?
`;

  await connection.execute(query, [id]);
};

module.exports = {
  listAll,
  findById,
  insert,
  remove,
};
