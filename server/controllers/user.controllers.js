const Usuario = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret_key = "Esta es mi llave secreta";

module.exports.register = (req, res) => {
    const user = new Usuario(req.body);
    user.save()
        .then(usuario => {
            /*res.json(usuario);*/

            const payload = {
                _id: user._id
            }

            //Guardar al usuario en una cookie
            const myJWT = jwt.sign(payload, secret_key);

            res
                .cookie("usertoken", myJWT, secret_key, {
                    httpOnly: true
                })
                .json(usuario)



        })
        .catch( err => {
            console.log(err);
            res.status(400).json(err);
        })
}