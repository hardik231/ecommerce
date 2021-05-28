const express = require('express')
const router = express.Router()

const { getCategories, createCategories, deleteCategories, getCategory, deleteCategory } = require('../controllers/product-category.controller')


router.get('/', getCategories)
router.get('/:categoryId', getCategory)

router.post('/', createCategories)
router.delete('/', deleteCategories)
router.delete('/:categoryId', deleteCategory)

module.exports = router