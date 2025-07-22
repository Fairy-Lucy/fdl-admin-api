// routes/images.js
const express = require('express');
const router = express.Router();
const { getAllImages, createImage, deleteImage } = require('../controller/imagesController');

router.get('/', getAllImages);
router.post('/', createImage);
router.delete('/:nom', deleteImage);

module.exports = router;
