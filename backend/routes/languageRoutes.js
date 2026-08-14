const express = require('express');
const router = express.Router();
const { getLanguageSummary } = require('../controllers/languageController');

// Public language summary route
router.get('/summary', getLanguageSummary);

module.exports = router;