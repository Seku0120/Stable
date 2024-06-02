const express = require('express');
const { generateImageMidjourney, generateImageStableDeffusion, generateImageDallE } = require('../controllers/controller');
const router = express.Router();

router.post('/dall-e', generateImageDallE);
router.post('/midjourney', generateImageMidjourney);
router.post('/stable-deffusion', generateImageStableDeffusion);

module.exports = router;
