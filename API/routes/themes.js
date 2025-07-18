// routes/themes.js
const express = require('express');
const router = express.Router();
const { getAllThemes, createTheme } = require('../controller/themesController');

router.get('/', getAllThemes);
router.post('/', createTheme);

module.exports = router;
