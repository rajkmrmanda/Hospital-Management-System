const db = require('../config/db')
const bcrypt = require('bcrypt');

const hashPassword2 = async (password) => {
    console.log(password)
    return bcrypt.hashSync(password, 5);
}


exports.createNormalUser = async (payload, res) => {
    // hash the password
    payload.password = await hashPassword2(payload.password)

    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        // Save user in database

        const query = `INSERT INTO user (email, firstName,lastName,birthDate,contact,gender,password,type,is_active) 
                        VALUES ('${payload.email}','${payload.firstName}','${payload.lastName}',
                        '${payload.birthDate}','${payload.contact}','${payload.gender}',
                        '${payload.password}','${payload.type}',TRUE)`

        con.query(query, function (err, result) {
            if (err) {

                reject(new Error(err.sqlMessage));
            }
            resolve(result);
        })

    })
};


exports.updateNormalUserWithAddress = async = (payload,email) => {
    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        
        const query =   `
                        UPDATE
                            user
                        JOIN Address on
                            Address.userEmail = user.email
                        SET 
                            user.firstName='${payload.firstName}', user.lastName='${payload.lastName}', user.birthDate='${payload.birthDate}', 
                            user.contact='${payload.contact}', user.gender='${payload.gender}', address='${payload.address}',state='${payload.state}',
                            city='${payload.city}',Address.pincode ='${payload.pinCode}'
                        WHERE user.email='${email}'  
                        `

        con.query(query, function (err, result) {
            if (err) {
                console.log(err)    
                reject(new Error(err.sqlMessage));
            }
            resolve(result);
        })

    })
}

exports.findOne = (payload) => {
    if (!payload.email) {
        return null;
    }

    return new Promise(function (resolve, reject) {
        const query = `SELECT * FROM user WHERE email = '${payload.email}';`

        const conn = db.getConnection()
        conn.query(query, function (err, result) {
            if (err) {
                reject(new Error('Error while parsing'))
            }
            if (result.length == 0) {
                resolve("User not found")
            }
            return resolve(result[0])
        })
    })
}


exports.userAddress = (payload) => {
    return new Promise(function (resolve, reject) {



        var query = `SELECT * FROM user INNER JOIN Address ON user.email = Address.userEmail  WHERE  user.email ='${payload.email}';`
        if (payload.type == "HospitalManager") {
            query = `SELECT * FROM user 
                    INNER JOIN Hospital on user.email = Hospital.adminEmail
                    Inner JOIN HospitalAddress on HospitalAddress.hospital  = Hospital.name  
                    WHERE  user.email ='${payload.email}';`
        }
        const conn = db.getConnection()
        conn.query(query, function (err, result) {
            if (err) {
                console.log(err)
               return  reject(new Error('Error while parsing'))
            }

            else if (result && result.length == 0) {
                return resolve("User not found")
            }
            
            return resolve(result[0])
        })
    })
}


exports.updatePassword = async (payload) =>{
    console.log(payload)
    payload.newPassword = await hashPassword2(payload.newPassword)
    console.log(payload.newPassword)
    return new Promise(function (resolve, reject) {
       
        var query = `SELECT * FROM user  WHERE  user.email ='${payload.email}';`
        const conn = db.getConnection()
        conn.query(query, function (err, result) {
            if (err) {
                console.log(err)
               return  reject(new Error('Error while parsing'))
            }

            else if (result && result.length == 0) {
                return resolve("User not found")
            }


            if(!bcrypt.compareSync(payload.password, result[0].password)){
                return  reject(new Error('old password new password didnt match'))
            }

            if (bcrypt.compareSync(payload.password, result[0].password)) {
                const updateQuery = `
                UPDATE hospital.user
                SET  password='${payload.newPassword}'
                WHERE  user.email ='${payload.email}';`
                conn.query(updateQuery, function (err, result) {
                    console.log(result)
                    if (err) {
                        console.log(err)
                       return  reject(new Error('Error while parsing'))
                    }
                
                return resolve(result)
                })
                console.log('jddsdere')
            }
            
            return resolve(result[0])
        })
    }) 
}