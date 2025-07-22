// routes/documents.js
const express = require('express');
const router = express.Router();
const { getAllDocuments, createDocument, deleteDocument} = require('../controller/documentsController');

router.get('/', getAllDocuments);
router.post('/', createDocument);
router.delete('/:titre', deleteDocument);

module.exports = router;
