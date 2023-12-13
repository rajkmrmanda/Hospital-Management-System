const db = require('../config/db')
const bcrypt = require('bcrypt');

exports.createEmergencyDetails = async (payload, slot) => {

    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        // Save user in database
        const query = `INSERT INTO EmergencyDetails
        (firstName, lastName, relationship, contact, slot)
        VALUES('${payload.eFirstName}', '${payload.eLastName}', '${payload.relationship}', '${payload.eContact}', '${slot}');`
        con.query(query, function (err, result) {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            resolve(result);
        })

    })
};

exports.createHealthDetails = async (payload, slot) => {

    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        // Save user in database
        const query = `INSERT INTO Health (height, weight, slot, medicationStatus, medicationList, medicationAllergies, operationsList, healthIssuesChecked) VALUES
                            ( '${payload.height}', '${payload.weight}','${slot}' ,'${payload.medicationStatus}', '${payload.medicationList}', '${payload.medicationAllergies}',
                            '${payload.operationsList}', '${payload.healthIssuesChecked}');
        `
        con.query(query, function (err, result) {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            resolve(result);
        })

    })
};
exports.createBMI = async (payload, slot) => {

    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        // Save user in database
        const query = `INSERT INTO BMI (height, weight, user) VALUES ('${payload.height}', '${payload.weight}', ${payload.bookedBy})`
        con.query(query, function (err, result) {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            resolve(result);
        })

    })
};
exports.createMedication = async (payload, slug, slot) => {

    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        // Save user in database
        const query = `INSERT INTO Medication (name, info, hospital) VALUES (${payload.bookedBy}, '${payload.medicationList}', ${slug})`
        con.query(query, function (err, result) {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            resolve(result);
        })

    })
};
exports.createHealthIssues = async (payload, slot) => {

    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        // Save user in database
        const query = `INSERT INTO healthIssues (slot, healthIssuesChecked) VALUES (${slot}', ${payload.healthIssuesChecked}')`
        con.query(query, function (err, result) {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            resolve(result);
        })

    })
};


exports.createCovidQuestions = async (payload, slot) => {
    const query = `INSERT INTO Covid19Questionnaires (slot, covidSymptomsChecked) 
    VALUES('${slot}', '${payload.covidSymptomsChecked}');
    `
    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        // Save user in database
        con.query(query, function (err, result) {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            resolve(result);
        })

    })
}
exports.createCovidSymptoms = async (payload, slot) => {

    const query = `INSERT INTO covidSymptoms (slot, covidSymptomsChecked) 
    VALUES('${slot}', '${payload.covidSymptomsChecked}');
    `
    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        // Save user in database
        con.query(query, function (err, result) {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            resolve(result);
        })

    })
}


exports.createSlot = async (payload, slug) => {
    const query = `INSERT INTO Slot (userEmail, hospital, status) 
            VALUES('${payload.bookedBy}', '${slug}', "MGAP");
    `
    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        // Save user in database
        con.query(query, function (err, result) {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            resolve(result);
        })
    })
}