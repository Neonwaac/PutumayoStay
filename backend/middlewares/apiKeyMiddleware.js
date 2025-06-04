const dotenv = require('dotenv');
dotenv.config();

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.PUTUMAYOSTAY_API_KEY) {
    return res.status(401).json({ mensaje: "Acceso no autorizado - Clave inválida" });
  }
  next();
};

module.exports = apiKeyMiddleware;