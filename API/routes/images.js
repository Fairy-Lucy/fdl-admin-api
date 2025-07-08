const express = require('express');
const router = express.Router();
const { getAllImagesWithDetails, createImage } = require('../controller/imagesController');

router.get('/details', getAllImagesWithDetails);
router.post('/', createImage);

module.exports = router;
