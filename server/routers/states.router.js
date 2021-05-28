const express = require('express')
const router = express.Router()

const { createState, getState } = require('../controllers/state.controller')

router.post('/', createState)
router.get('/:countryName', getState)

module.exports = router