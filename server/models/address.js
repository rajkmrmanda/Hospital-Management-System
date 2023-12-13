const db = require('../config/db')


exports.createAddress = (payload, userEmail) => {

    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        // Save user in database
        const query = `INSERT INTO Address (userEmail,address,city,pincode,state) VALUES 
        ('${userEmail}','${payload.address}','${payload.city}','${payload.pinCode}','${payload.state}')`

        con.query(query, function (err, result) {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            resolve(result);
        })

    })
};


exports.createHospitalAddress = async (payload,name) => {

    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        // Save user in database
        const query = `INSERT INTO HospitalAddress (hospital,address,city,pincode,state) VALUES 
        ('${name}','${payload.address}','${payload.city}','${payload.pinCode}','${payload.state}')`

        con.query(query, function (err, result) {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            resolve(result);
        })

    })
};