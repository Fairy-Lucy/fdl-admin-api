// routes/motsCles.js
const express = require('express');
const router = express.Router();
const { getAllMotsCles, createMotCle, deleteMotCle } = require('../controller/motsClesController');

router.get('/', getAllMotsCles);
router.post('/', createMotCle);
router.delete('/:libelle', deleteMotCle);

module.exports = router;

