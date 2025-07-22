// controllers/documentsController.js
const pool = require('../model/db');

const getAllDocuments = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM documents');
        res.json(result.rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des documents :', err);
        res.sendStatus(500);
    }
};

const createDocument = async (req, res) => {
    const { titre, uri, theme } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO documents (titre, uri, theme) VALUES ($1, $2, $3) RETURNING *',
            [titre, uri, theme]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erreur lors de la création du document :', err);
        res.sendStatus(500);
    }
};

const deleteDocument = async (req, res) => {
    const { titre } = req.params;
    try {
        await pool.query('DELETE FROM documents WHERE titre = $1', [titre]);
        res.sendStatus(200);
    } catch (err) {
        console.error('Erreur lors de la suppression du document :', err);
        res.sendStatus(500);
    }
};

module.exports = {
    getAllDocuments,
    createDocument,
    deleteDocument
};
