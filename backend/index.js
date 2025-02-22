const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const usuarioRoutes = require('./routes/usuarioRoutes.js');
require('dotenv').config();
const db = require('./db/db.js');

app.use(express.json());
app.use(cors())

db.connect((err) => {
    if (err) {
        console.log(err);
        process.exit(1)
    } else {
        console.log('Connectado a la database --| PutumayoStay |--');
    }
})
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));
app.use('/uploads/archives', express.static(path.join(__dirname, 'uploads/archives')));
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads/videos')));
app.use(usuarioRoutes);
const PORT = 8077;
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:"+PORT);
});

