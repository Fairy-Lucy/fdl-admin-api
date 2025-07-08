// routes/associer.js
const express = require('express');
const router = express.Router();
const {
    associerImageLieu,
    associerImageMotCle
} = require('../controller/associerController');

// POST /associer/image-lieu
router.post('/image-lieu', associerImageLieu);

// POST /associer/image-motcle
router.post('/image-motcle', associerImageMotCle);

module.exports = router;
