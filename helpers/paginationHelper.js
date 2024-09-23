const getPagination = (currentPage, pageSize)=>{
    const limit = pageSize ? +pageSize : 10 ;
    const offset = currentPage ? (currentPage-1)*limit : 0 ;
    return {limit, offset};
};


const getPaginationData = (data, currentPage, limit)=>{
    const { count: totalCount, rows: products} = data;
    const totalPage = Math.ceil(totalCount / limit);
    return {
        currentPage,
        pageSize: limit,
        totalCount,
        totalPage,
        data: products
    };
};

module.exports = { getPagination, getPaginationData}