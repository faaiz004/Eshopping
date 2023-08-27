const Product = require('../models/product')

const getAllProductsStatic = async (req,res) =>{
    const products = await Product.find({})
    res.status(200).json({products, nbHits:products.length})
}

const getAllProducts = async (req,res) =>{
    const {featured,company,name,sort,fields, numericFilters} = req.query // only looking for featured from the query
    
    const queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true'? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name,$options:'i'}// regex gives result based on name
    }
    let result = Product.find(queryObject);// req.query means only those products are returned whose property matches that of req.query
    // sort based on different fields
    if(sort){
       const sortList = sort.split(',').join(' ')
       result = result.sort(sortList)
    }else{
        result = result.sort('createdAt')
    }
    if(fields){
        const fieldList = sort.split(',').join(' ')
        result = result.select(fieldList) // select makes sure that only the selected fields are returned
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1)* limit;
    result = result.skip(skip).limit(limit)
    // 23
    // divide 23/7 -> 4 pages 7,7,7,2

    // numericFilters are used to filter numeric properties like price.
    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=' :'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,(match) =>`-${operatorMap[match]}-`)
        const options = ['price','rating']
        filters = filters.split(',').forEach((item) =>{
            const [field,operator,value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]: Number(value)}
            }
        })
    }
    const products = await result
    res.status(200).json({products})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}