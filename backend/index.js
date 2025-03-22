const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const usuarioRoutes = require('./routes/usuarioRoutes.js');
const habitacionRoutes = require('./routes/habitacionRoutes.js')
const reviewRoutes = require('./routes/reviewRoutes.js');
const reservaRoutes = require('./routes/reservaRoutes.js')
require('dotenv').config();
const db = require('./db/db.js');

app.use(express.json());
app.use(cors());

db.connect((err) => {
    if (err) {
        console.log(err);
        process.exit(1)
    } else {
        console.log('Conectado a la database --| PutumayoStay |--');
    }
})

app.use('/uploads/archives', express.static(path.join(__dirname, 'uploads/archives')));

app.use(usuarioRoutes);
app.use(habitacionRoutes);
app.use(reviewRoutes);
app.use(reservaRoutes);
const PORT = 8077;
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:"+PORT);
});

