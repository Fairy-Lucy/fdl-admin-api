const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('./model/db');
const app = express();
const port = 3000;
const os = require('os');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'android_asset/drawable-mdpi/';
        ensureDir(uploadDir);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const documentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'android_asset/documentation/';
        ensureDir(uploadDir);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadImage = multer({ storage: imageStorage });
const uploadDocument = multer({ storage: documentStorage });

app.use(express.json());
app.use(express.static('public'));


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

app.post('/android_asset/drawable-mdpi', uploadImage.single('image'), async (req, res) => {
    try {
        const { description } = req.body;
        const { file } = req;

        if (!file) return res.status(400).send('Aucun fichier uploadé.');

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

app.post('/android_asset/documentation', uploadDocument.single('document'), async (req, res) => {
    try {
        const { theme, titre } = req.body;
        const { file } = req;

        if (!file) return res.status(400).send('Aucun fichier uploadé.');

        const document = await pool.query(
            'INSERT INTO documents (uri, titre, theme_id) VALUES ($1, $2, $3) RETURNING *',
            [file.path, titre, theme]
        );

        res.json(document.rows[0]);
    } catch (error) {
        console.error('Erreur lors de l\'upload du document :', error);
        res.status(500).send('Erreur lors de l\'upload du document.');
    }
});


function getLocalIPAddress() {
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
        for (const config of iface) {
            if (config.family === 'IPv4' && !config.internal) {
                return config.address;
            }
        }
    }
    return 'localhost';
}

const ip = getLocalIPAddress();

app.listen(port, '0.0.0.0', () => {
    console.log(`Serveur lancé sur http://${ip}:${port}`);
    console.log(`Accédez à l'interface d'administration sur http://${ip}:${port}/admin.html`);
});
