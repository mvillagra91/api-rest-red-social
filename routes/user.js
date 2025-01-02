const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

//Definir rutas
    //Get
router.get("/prueba-usuario", UserController.pruebaUser);

    //Post
//name, surname, nick, email, role, image, created_at
router.post("/register", UserController.register); 


//exportar router
module.exports = router;