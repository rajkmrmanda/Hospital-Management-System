const User = require("../models/user");
const Hospital = require("../models/hospital");
const auth = require('../middlewares/auth')
const handler = require('../models/auth')



exports.checkUser = async (req, res) => {
    try {
        const email = req.body.email;
        return User.findOne({
                email: email
            }).then(result => res.json(result))
            .catch(err => res.status(400).json(err.message))
    } catch {
        res.status(500).json("Internal server Error")
    }
}

exports.currentUser = async (req, res) => {

    console.log(req.user)
    try {
        return User.userAddress({
                email: req.user.username,
                type: req.user.account_type
            }).then(result => res.json(result))
            .catch(err => res.status(400).json(err.message))
    } catch (error) {
        res.json(error);
    }
}

//===================== User ==========================//

//===================== authentication ==========================//


exports.authentication = async (req, res) => {

    try {

        return handler.authenticateUser(req.body).then(
            result => {
                data = {
                    token: auth.generateAccessToken(result[0].email, result[0].type),
                    user: result[0]
                }
                return res.json(data)
            }
        ).catch(err => {
            res.status(400).json({
                error: err.message
            })
        })


    } catch (error) {
        res.status(500).json({
            error: error
        });
    }

}



exports.updatePassword = async (req, res) => {

    try {
        return User.updatePassword(req.body.payload).then(result => res.json(result))
            .catch(err => res.status(400).json(err.message))
    } catch (error) {
        res.json(error);
    }
}