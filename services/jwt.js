// Importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

// Clave secreta
const secret = "CLAVE_SECRETA_del_proyecto_DE_LA_RED_soCIAL_987987";

// Crear función para generar tokens
const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        imagen: user.imagen,
        iat: moment().unix(), // Fecha de creación
        exp: moment().add(30, "days").unix() // Fecha de expiración
    };

    // Devolver un JWT token codificado
    return jwt.encode(payload, secret);
};

module.exports = {
    createToken
};