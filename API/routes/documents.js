// routes/documents.js
const express = require('express');
const router = express.Router();
const { getAllDocuments, createDocument } = require('../controller/documentsController');

router.get('/', getAllDocuments);
router.post('/', createDocument);

module.exports = router;
