const express = require('express')
const router = express.Router()

const { createCountries, getCountries } = require('../controllers/country.controller')

router.post('/', createCountries)
router.get('/', getCountries)

module.exports = router