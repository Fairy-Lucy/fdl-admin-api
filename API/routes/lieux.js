const express = require('express');
const router = express.Router();
const { getAllLieux, createLieu } = require('../controller/lieuxController');

router.get('/', getAllLieux);
router.post('/', createLieu);

module.exports = router;
