const express = require('express')
const router = express.Router()
const { handleGenerateNewSHortURL } = require('../controllers/url')

router.post('/', handleGenerateNewSHortURL);

module.exports = router;