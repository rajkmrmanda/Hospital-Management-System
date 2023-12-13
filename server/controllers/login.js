const User = require('../models/user')
const Address = require('../models/address')
const Hospital = require('../models/hospital')


exports.login = async (req, res) => {

    const body = req.body

    // check field exists or not
    if (!body.email | !body.password) {
        return res.status(400).json({
            'error': 'Please send email or password'
        })
    }

    


}