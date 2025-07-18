// server.js
const express = require('express');
const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
