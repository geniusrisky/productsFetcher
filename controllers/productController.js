const { getPagination, getPaginationData } = require  ("../helpers/paginationHelper");
const { fetchProducts } = require ("../models/productModel");




const getProducts = async(req, res)=>{

try{

        const { currentPage=1, pageSize=10, orderBy='createdAt', orderDir='desc', searchBy= '', searchFields =[] } = req.query;
    //pagionation
    const { limit, offset} = getPagination(currentPage, pageSize);

    //sort
    const sorting = {orderBy, orderDir};

    //filters

    const filters = { searchBy, searchFields: Array.isArray(searchFields)? searchFields: [searchFields]};

    

    // fetch products from the database

    const data = await fetchProducts(filters, {limit, offset}, sorting)
        // create pagination data
        const response = getPaginationData(data, currentPage, limit);
    //console.log(response)
        res.status(200).json(response);


}catch(error){
    console.log(error);
    res.status(500).json({message:'Error fetching Products'});
    
}

}
module.exports = { getProducts};