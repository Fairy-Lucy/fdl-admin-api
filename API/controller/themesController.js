// controller/themesController.js
const pool = require('../model/db');

const getAllThemes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM theme');
        res.json(result.rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des thèmes :', err);
        res.sendStatus(500);
    }
};

const createTheme = async (req, res) => {
    const { nom } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO theme (nom) VALUES ($1) RETURNING *',
            [nom]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erreur lors de la création du thème :', err);
        res.sendStatus(500);
    }
};

module.exports = {
    getAllThemes,
    createTheme,
};
