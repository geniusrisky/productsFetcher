const { getPool } = require('../config/dbConfig');

const fetchProducts = async (filters, pagination, sorting) => {
  const pool = await getPool();  // Ensure the pool is initialized
  const { searchBy, searchFields } = filters;
  const { limit, offset } = pagination;
  const { orderBy, orderDir } = sorting;

  let searchCondition = '';
  if (searchBy && searchFields.length > 0) {
    const fieldsCondition = searchFields.map((field) => `${field} LIKE ?`).join(' OR ');
    searchCondition = `WHERE (${fieldsCondition})`;
  }

  const query = `
    SELECT 
      productId, productName, imagesUrl, brandName, 
      description, currency, price, 
       status, createdAt, 
      updatedAt, stock, 
      pricingType, discount, category, subCategory, 
      organizationId

  
    FROM Products
    ${searchCondition}
    ORDER BY ${orderBy} ${orderDir}
    LIMIT ?, ?;
  `;

  const params = searchFields.length > 0 ? [...searchFields.map(() => `%${searchBy}%`), offset, limit] : [offset, limit];

  const [rows] = await pool.query(query, params);  // Use pool.query() after initialization
  
  // Get total count
  const [countResult] = await pool.query('SELECT COUNT(*) AS count FROM Products');
  const count = countResult[0].count;

  return { rows, count };
};

module.exports = { fetchProducts };
