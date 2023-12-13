const admin = require("../firebase");
const User = require("../models/user");
const jwt = require('jsonwebtoken')


const TOKEN_SECRET = "sdsdfsfjaksnasjnkdaskjndasasdasd"

exports.generateAccessToken = (username, account_type) => {
    return jwt.sign({
        username,
        account_type
    }, TOKEN_SECRET, {
        expiresIn: '365d'
    });
};

exports.authCheck = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

exports.adminCheck = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}