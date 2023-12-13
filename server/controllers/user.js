const User = require("../models/user");

exports.updateUser = async (req, res) => {
    try {
        console.log(req.body)
        await User.updateNormalUserWithAddress(req.body,req.user.username)
            .then(data => res.json(data))
            .catch(err => res.status(400).json(err.message))
    } catch {
        res.json("error while creating user please try later")
    }
};