const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.rol)) {
            return res.status(403).json({ message: "Acceso denegado: No tienes permisos suficientes" });
        }
        next();
    };
};

module.exports = roleMiddleware;
