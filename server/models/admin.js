const db = require('../config/db')


exports.getAnalytics = () => {
    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        // Save user in database
        const query = `SELECT  COUNT(id) as slotCount from Slot; SELECT type,COUNT( type ) as count  from user WHERE type!='Admin' GROUP BY type ;   `

        con.query(query, [1, 2], function (err, result) {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            resolve(result);
        })

    })
};


exports.getHospitalsForAdmin = () => {

    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        // Save user in database
        const query = `
        SELECT
        *
        from
            Hospital
        Join HospitalAddress on
            Hospital.name = HospitalAddress.hospital
        Join user on user.email = Hospital.adminEmail  
        `
        con.query(query, function (err, result) {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            resolve(result);
        })
    })
}


exports.getUsers = () => {
    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        // Save user in database
        const query = `
        SELECT
        *
        from
            user
        Join Address on
            user.email = Address.userEmail
        where user.type = 'User';  
        `
        con.query(query, function (err, result) {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            resolve(result);
        })
    })
}

exports.deactivateHospital = () => {
    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        // Save user in database
        const query = `
        UPDATE hospital.Hospital
        SET 
        WHERE name='';
        `
        con.query(query, function (err, result) {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            resolve(result);
        })
    })

}