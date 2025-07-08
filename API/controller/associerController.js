// controller/associerController.js
const pool = require('../model/db');

const associerImageLieu = async (req, res) => {
    const { lieu_id, image_id } = req.body;
    try {
        await pool.query(
            'INSERT INTO lieux_images (lieu_id, image_id) VALUES ($1, $2)',
            [lieu_id, image_id]
        );
        res.sendStatus(200);
    } catch (e) {
        console.error('Erreur association image-lieu :', e);
        res.status(500).send('Erreur lors de l’association image-lieu');
    }
};

const associerImageMotCle = async (req, res) => {
    const { image_id, mot_cle_id } = req.body;
    try {
        await pool.query(
            'INSERT INTO images_mots_cles (image_id, mot_cle_id) VALUES ($1, $2)',
            [image_id, mot_cle_id]
        );
        res.sendStatus(200);
    } catch (e) {
        console.error('Erreur association image-mot-clé :', e);
        res.status(500).send('Erreur lors de l’association image-mot-clé');
    }
};

module.exports = {
    associerImageLieu,
    associerImageMotCle
};
