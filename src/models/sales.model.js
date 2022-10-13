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

module.exports = {
  listAll,
  findById,
};
