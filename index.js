//Importar dependencias
const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");

//mensaje de bienvenida
console.log("API NODE para RED SOCIAL arrancada!");

//Conexion a bbdd
connection();

//crear servidor node
const app = express();
const puerto = 3900;

//configurar cors
app.use(cors());

//convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//cargar conf rutas
const UserRoutes = require("./routes/user");
const PublicationRoutes = require("./routes/publication");
const FollowRoutes = require("./routes/follow");

app.use("/api", UserRoutes);
app.use("/api", PublicationRoutes);
app.use("/api", FollowRoutes);

//ruta de prueba
app.get("/ruta-prueba", (req, res) => {
    return res.status(200).json(
        {
            "id": 1,
            "nombre": "Mario",
            "web": "mvillagra.com"
        }
    )
})

//poner servidor a escuchar peticiones http
app.listen(puerto, () =>{
    console.log("Servidor corriento en el puerto: "+puerto);
})