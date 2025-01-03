//Importar dependencias y módulos
const bcrypt = require("bcrypt");

//Importar Modelo
const User = require("../models/users");

//Importar Servicios
const jwt = require("../services/jwt");

//Acciones de prueba
const pruebaUser = async (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/user.js"
    });
};

//Registro de usuarios
const register = async (req, res) => {
    try {
        //Recoger datos de la petición
        let params = req.body;

        //Comprobar que los datos llegan bien + validación
        if (!params.name || !params.nick || !params.email || !params.password) {
            return res.status(400).json({
                status: "Error",
                message: "Datos incompletos"
            });
        }

        //Control de usuarios duplicados
        const existingUsers = await User.find({
            $or: [
                { email: params.email.toLowerCase() },
                { nick: params.nick.toLowerCase() }
            ]
        });

        if (existingUsers.length > 0) {
            return res.status(400).json({
                status: "Error",
                message: "El usuario ya existe"
            });
        }

        //Cifrar la contraseña
        params.password = await bcrypt.hash(params.password, 10);

        //Crear objeto de usuario
        const user_to_save = new User(params);

        //Guardar usuario en la base de datos
        const userStored = await user_to_save.save();

        //Devolver resultado
        return res.status(200).json({
            status: "Success",
            message: "Usuario registrado con éxito",
            user: userStored
        });
    } catch (error) {
        //Manejo de errores
        console.error(error);
        return res.status(500).json({
            status: "Error",
            message: "Error al registrar el usuario"
        });
    }
};

//name, surname, nick, email, role, image, created_at
const login = async (req, res) => {

    //Recoger parametros
    let params = await req.body;

    if(!params.email || !params.password){
        return res.status(400).json({
            status: "Error",
            message: "Faltan datos por enviar"
        })
    }

    //Buscar en la BD si existe
    const user = await User.findOne({ email: params.email.toLowerCase() });

    if (!user) {
        return res.status(400).json({
            status: "Error",
            message: "No existe el usuario"
        });
    }

    //Comprobar su contraseña
    let pwd = bcrypt.compareSync(params.password, user.password);
    if(!pwd){
        return res.status(400).send({
            status: "Error",
            message: "No te has identificado correctamente."
        })
    }

    //Devolver token
    const token = jwt.createToken(user);

    //Devolver datos del usuario
    return res.status(200).send({
        status: "Success",
        message: "Te has identificado correctamente",
        user: {
            id: user._id,
            name: user.name,
            nick: user.nick
        },
        token
    })
}

//Exportar acciones
module.exports = {
    pruebaUser,
    register,
    login
};