const express = require('express');
const router = express.Router();
const { getImpactSummary } = require('../controllers/impactController');

router.get('/summary', getImpactSummary);

module.exports = router;
