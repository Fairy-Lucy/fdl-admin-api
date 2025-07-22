const db = require('../model/db');

exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await db.all('SELECT * FROM document');
        res.json(documents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur interne' });
    }
};

exports.createDocument = async (req, res) => {
    const { titre, uri, theme } = req.body;
    if (!titre || !uri || !theme) {
        return res.status(400).json({ error: 'Champs manquants' });
    }

    try {
        const result = await db.run(
            'INSERT INTO document (titre, uri, theme) VALUES (?, ?, ?)',
            [titre, uri, theme]
        );
        res.json({ id: result.lastID, titre, uri, theme });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur interne' });
    }
};
