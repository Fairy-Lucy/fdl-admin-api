// routes/lieux.js
const express = require('express');
const router = express.Router();
const { getAllLieux, createLieu, deleteLieu } = require('../controller/lieuxController');

router.get('/', getAllLieux);
router.post('/', createLieu);
router.delete('/:nom', deleteLieu);

module.exports = router;
