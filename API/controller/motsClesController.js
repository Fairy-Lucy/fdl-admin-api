// controllers/motsClesController.js
const pool = require('../model/db');

const getAllMotsCles = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM mots_cles');
        res.json(result.rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des mots-clés :', err);
        res.sendStatus(500);
    }
};

const createMotCle = async (req, res) => {
    const { libelle } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO mots_cles (libelle) VALUES ($1) RETURNING *',
            [libelle]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erreur lors de la création du mot-clé :', err);
        res.sendStatus(500);
    }
};

const deleteMotCle = async (req, res) => {
    const { libelle } = req.params;
    try {
        await pool.query('DELETE FROM mots_cles WHERE libelle = $1', [libelle]);
        res.sendStatus(200);
    } catch (err) {
        console.error('Erreur lors de la suppression du mot-clé :', err);
        res.sendStatus(500);
    }
};

module.exports = {
    getAllMotsCles,
    createMotCle,
    deleteMotCle
};
