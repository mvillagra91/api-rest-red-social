//Acciones de prueba
const pruebaPublication = async (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/publication.js"
    })
}

module.exports = {
    pruebaPublication
}