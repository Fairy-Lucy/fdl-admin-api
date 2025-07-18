// routes/associer.js
const express = require('express');
const router = express.Router();
const pool = require('../model/db');

router.post('/image-lieu', async (req, res) => {
    const { image_id, lieu_id } = req.body;
    try {
        await pool.query('INSERT INTO lieux_images (lieu_id, image_id) VALUES ($1, $2)', [lieu_id, image_id]);
        res.sendStatus(200);
    } catch (err) {
        console.error('Erreur association image-lieu:', err);
        res.sendStatus(500);
    }
});

router.post('/image-motcle', async (req, res) => {
    const { image_id, mot_cle_id } = req.body;
    try {
        await pool.query('INSERT INTO images_mots_cles (image_id, mot_cle_id) VALUES ($1, $2)', [image_id, mot_cle_id]);
        res.sendStatus(200);
    } catch (err) {
        console.error('Erreur association image-motclé:', err);
        res.sendStatus(500);
    }
});

module.exports = router;
