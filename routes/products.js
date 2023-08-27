const express = require('express')
const router = express.Router() // setting up the router

const {getAllProducts, getAllProductsStatic} = require('../controllers/products')

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)

module.exports = router // export router that handles api calls
