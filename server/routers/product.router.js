const express = require('express')
const router = express()

const { partialUpdate, createProduct, getProducts, getProduct, createProducts, deleteProduct, deleteProducts, getProductsByKeyword,  updateProducts, getProductsByCategory} = require('../controllers/product.controller')
const { uploadImg } = require('../controllers/product-image.controller')

router.get('/', getProducts)

router.get('/:productId', getProduct)
router.get('/search/:keyword', getProductsByKeyword)
router.get('/categories/:categoryId', getProductsByCategory)

router.post('/createProducts',  uploadImg, createProducts)
router.post('/createProduct/single', uploadImg, createProduct)

router.patch('/update/:productId', partialUpdate)

router.delete('/:productId', deleteProduct)
router.delete('/', deleteProducts)


module.exports = router