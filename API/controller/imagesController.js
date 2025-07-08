const pool = require('../model/db');

const getAllImagesWithDetails = async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT 
        i.id AS image_id,
        i.uri,
        i.description,
        ARRAY_AGG(DISTINCT l.nom) AS lieux,
        ARRAY_AGG(DISTINCT m.libelle) AS mots_cles
      FROM images i
      LEFT JOIN lieux_images li ON i.id = li.image_id
      LEFT JOIN lieux l ON li.lieu_id = l.id
      LEFT JOIN images_mots_cles imc ON i.id = imc.image_id
      LEFT JOIN mots_cles m ON imc.mot_cle_id = m.id
      GROUP BY i.id
    `);
        res.json(result.rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des images détaillées :', err);
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

module.exports = {
    getAllImagesWithDetails,
    createImage,
};
