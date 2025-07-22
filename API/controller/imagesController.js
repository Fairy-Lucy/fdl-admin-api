// controllers/imagesController.js
const pool = require('../model/db');

const getAllImages = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM images');
        res.json(result.rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des images :', err);
        res.sendStatus(500);
    }
};

const createImage = async (req, res) => {
    const { uri, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO images (uri, description) VALUES ($1, $2) RETURNING *',
            [uri, description]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erreur lors de la création de l\'image :', err);
        res.sendStatus(500);
    }
};

const deleteImage = async (req, res) => {
    const { nom } = req.params;
    try {
        await pool.query('DELETE FROM images WHERE uri = $1', [nom]);
        res.sendStatus(200);
    } catch (err) {
        console.error('Erreur lors de la suppression de l\'image :', err);
        res.sendStatus(500);
    }
};

module.exports = {
    getAllImages,
    createImage,
    deleteImage
};
