const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('./model/db'); // Importez le module pool
const app = express();
const port = 3000;

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        // Crée le répertoire s'il n'existe pas
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Utilise le nom original du fichier
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static('public'));

// Routes
const lieuxRoutes = require('./routes/lieux');
const imagesRoutes = require('./routes/images');
const motsClesRoutes = require('./routes/motsCles');
const themesRoutes = require('./routes/themes');
const documentsRoutes = require('./routes/documents');

app.use('/lieux', lieuxRoutes);
app.use('/images', imagesRoutes);
app.use('/motscles', motsClesRoutes);
app.use('/themes', themesRoutes);
app.use('/documents', documentsRoutes);

// Route pour l'upload d'images
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { description } = req.body;
        const { file } = req;

        if (!file) {
            return res.status(400).send('Aucun fichier uploadé.');
        }

        // Sauvegardez les informations de l'image dans la base de données
        const image = await pool.query(
            'INSERT INTO images (uri, description) VALUES ($1, $2) RETURNING *',
            [file.path, description]
        );

        res.json(image.rows[0]);
    } catch (error) {
        console.error('Erreur lors de l\'upload de l\'image:', error);
        res.status(500).send('Erreur lors de l\'upload de l\'image.');
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Serveur lancé sur http://0.0.0.0:${port}`);
});
