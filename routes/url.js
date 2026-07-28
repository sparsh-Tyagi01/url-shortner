const express = require('express')
const router = express.Router()
const { handleGenerateNewSHortURL, handleGetAnalytics } = require('../controllers/url')

router.post('/', handleGenerateNewSHortURL);
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;