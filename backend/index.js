const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const usuarioRoutes = require("./routes/usuarioRoutes.js");
const habitacionRoutes = require("./routes/habitacionRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");
const reservaRoutes = require("./routes/reservaRoutes.js");
const fs = require("fs")
const https = require("https")
require("dotenv").config();
const db = require("./db/db.js");
const passport = require("./config/passportConfig");
const session = require("express-session");
const apiKeyMiddleware = require("./middlewares/apiKeyMiddleware");

app.use(express.json());
app.use(cors());

const options ={
  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem"))
}

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

db.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log("Conectado a la database --| PutumayoStay |--");
  }
});
app.use(usuarioRoutes);
app.use("/uploads/images", express.static(path.join(__dirname, "uploads/images")));
app.use(
  "/uploads/archives",
  express.static(path.join(__dirname, "uploads/archives"))
);

app.use(habitacionRoutes);
app.use(reviewRoutes);
app.use(reservaRoutes);

// Por esto (mejor separar puerto de servidor y DB):
const PORT = process.env.PORT || 8077;
const DB_PORT = process.env.PUTUMAYOSTAY_DB_PORT || 3306;

https.createServer(options, app).listen(PORT, () => {
  console.log("Servidor corriendo en https://localhost:" + PORT);
});
