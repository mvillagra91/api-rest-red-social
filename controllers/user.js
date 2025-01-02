//Importar dependencias y modulos
const users = require("../models/users");
const User = require("../models/users");

//Acciones de prueba
const pruebaUser = async (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/user.js"
    })
}

//registro de usuarios - Modelo del usuario: name, surname, nick, email, password, role, image, created_at
const register = async (req, res) => {
    //Recoger datos de la peticion
    let params = req.body;

    //Comprobar que estos datos llegan bien + validacion
    if(!params.name || !params.nick || !params.email || !params.password){
        return res.status(400).json({
            status: "Error",
            message: "Datos incompletos"
        })
    }

    //Crear objeto de usuario
    let user_to_save = new User(params);

    //Control de usuarios duplicados
    User.find({ $or: [
        {email: user_to_save.email.toLowerCase()},
        {nick: user_to_save.nick.toLowerCase()}
    ]}).exec((error, users) => {
        if(error) return res.status(500).json({
            message: "Error"
        })

        if(users && users.length >= 1){
            return res.status(200).json({
                status: "Success",
                message: "Usuario ya existe"
            })
        }
    });

    //Cifrar la contraseña

    //Guardar usuario en la bd

    //Devolver resultado

    return res.status(200).json({
        status: "Success",
        message: "Accion de registro de usuarios",
        user_to_save
    })
}

//exportar acciones
module.exports = {
    pruebaUser,
    register
}