const express = require('express');
const router = express.Router();

const { getAllStates, getAllCitiesByState } = require('../controllers/state.controller');

router.get('/getAllStates', getAllStates);
router.get('/getAllCitiesByState', getAllCitiesByState);
router.get('/getCities', getAllCitiesByState);

module.exports = router;