const express = require('express')
const router = express.Router()

const { createPurchase, getPurchase, deletePurchase } = require('../controllers/purchase.controller')

router.post('/', createPurchase)
router.get('/', getPurchase)
router.delete('/', deletePurchase)

module.exports = router