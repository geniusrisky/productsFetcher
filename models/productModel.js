const pool = require("../config/dbConfig");

const fetchProducts = async (filters, pagination, sorting) => {
  const { searchBy, searchFields } = filters;
  const { limit, offset } = pagination;
  const { orderBy, orderDir } = sorting;

  let searchCondition = "";
  if (searchBy && searchFields.length > 0) {
    const fieldsCondition = searchFields
      .map((field) => `${field} LIKE ?`)
      .join(" OR ");
    searchCondition = `WHERE (${fieldsCondition})`;
  }

  const query = `SELECT
       
        
    productId, productName, productImagesName, brandName, description, itemCode, itemType, saleAmount, broshureFileName,
     vendors, status, createdBy, createdAt, updatedAt, subCategoryId, categoryId, custOrgId,
     uomId, shippingMethodId,
        shippingTermId,
        paymentTermId,

        FROM ProductV2
        ${searchCondition}
        ORDER BY ${orderBy} ${orderDir}
        LIMIT ? , ?;
    `;


    const params = searchFields.length > 0 ? [...searchFields.map(()=> `%${searchBy}%`), offset, limit] : [offset, limit];

    const [rows] = await pool.execute(query, params);
    
    const [countResult] = await pool.execute('SELECT COUNT(*) AS count FROM ProductV2');

    const count = countResult[0].count;

    return { rows, count };


};

module.exports = { fetchProducts} 