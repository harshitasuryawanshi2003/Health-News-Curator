const express = require('express');
const router = express.Router();
const { generateSummary, simplifyArticle } = require('../controllers/aiController');

router.post('/ai/generate-summary', generateSummary);
router.post('/ai/simplify', simplifyArticle);

module.exports = router;
