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
app.use(usuarioRoutes);
const PORT = 8077;
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:"+PORT);
});

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

app.post('/images',upload.single('image'),(req,res)=>{
    saveImage(req.file);
    console.log(req.file)
    res.send('Imagen subida');
})
app.post('/images/multi', upload.array('images', 5), (req, res) => {
    req.files.map(saveImage);
    res.send('Imagenes subidas');
})
function saveImage(file){
    const newPath = "./uploads/images/"+file.originalname;
    fs.renameSync(file.path,newPath);
    return newPath;
}
