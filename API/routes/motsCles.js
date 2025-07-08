const express = require('express');
const router = express.Router();
const { getAllMotsCles, createMotCle } = require('../controller/motsClesController');

router.get('/', getAllMotsCles);
router.post('/', createMotCle);

module.exports = router;
