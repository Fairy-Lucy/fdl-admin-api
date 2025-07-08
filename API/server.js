// server.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // <-- ici

// Routes
const lieuxRoutes = require('./routes/lieux');
const imagesRoutes = require('./routes/images');
const motsClesRoutes = require('./routes/motsCles');

const associerRoutes = require('./routes/associer');
app.use('/associer', associerRoutes);


app.use('/lieux', lieuxRoutes);
app.use('/images', imagesRoutes);
app.use('/motscles', motsClesRoutes);

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
