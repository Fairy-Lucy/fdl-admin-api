const pool = require('../model/db');

const getAllLieux = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM lieux');
        res.json(result.rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des lieux :', err);
        res.sendStatus(500);
    }
};

const createLieu = async (req, res) => {
    const { nom } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO lieux (nom) VALUES ($1) RETURNING *',
            [nom]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erreur lors de la création du lieu :', err);
        res.sendStatus(500);
    }
};

module.exports = {
    getAllLieux,
    createLieu,
};
