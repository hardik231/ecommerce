const express = require('express')
const router = express()

const { createProduct, getProducts, getProduct, createProducts, deleteProduct, deleteProducts, getProductsByKeyword,  updateProducts, getProductsByCategory} = require('../controllers/product.controller')
const { uploadImg } = require('../controllers/product-image.controller')

router.get('/', getProducts)
router.get('/:productId', getProduct)
router.get('/search/:keyword', getProductsByKeyword)
router.get('/categories/:categoryId', getProductsByCategory)

router.post('/',  uploadImg, createProducts)
//router.post('/', uploadImg, createProduct)

router.put('/', updateProducts)

router.delete('/:productId', deleteProduct)
router.delete('/', deleteProducts)


module.exports = router