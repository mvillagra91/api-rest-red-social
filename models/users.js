const { strict } = require("assert");
const {Schema, model} = require("mongoose");
const { type } = require("os");

const UserShema = Schema({
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String
    },
    nick: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "role_user"
    },
    image: {
        type: String,
        default: "default.png"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = model("User", UserShema, "users");
                        //Coleccion: users