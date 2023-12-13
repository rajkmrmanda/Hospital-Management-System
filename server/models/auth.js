const db = require('../config/db')
const bcrypt = require('bcrypt');


exports.authenticateUser = async ({
    email,
    password
}) => {

    return new Promise(function (resolve, reject) {

        const query = `SELECT * FROM user WHERE email = '${email}';`

        const conn = db.getConnection()
        conn.query(query, function (err, result) {
            if (err) {
                return reject(new Error('error while fetching user'))
            }
            if (result.length === 0) {
                return reject(new Error('user with provided credentials are not found in our database'))
            }
            if (bcrypt.compareSync(password, result[0].password)) {
                return resolve(result)
            }
            return reject(new Error('Invalid Credentials'))
        })
    })

}