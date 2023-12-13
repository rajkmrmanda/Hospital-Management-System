const {
    json
} = require('body-parser');
const db = require('../config/db')

exports.createHospital = async (payload, email) => {
    return new Promise(function (resolve, reject) {
        const con = db.getConnection();
        const query = `INSERT INTO Hospital (adminEmail, contact,name) 
                        VALUES ('${email}','${payload.contact}','${payload.hospitalName}')`
        con.query(query, function (err, result) {
            if (err) {
                reject(new Error(err.message))
            }
            resolve(result);
        })
    })

};

exports.findOne = (payload) => {

    const query = `SELECT * FROM Hospital WHERE name='${payload.name}';`

    const conn = db.getConnection()

    return new Promise(function (resolve, reject) {
        conn.query(query, function (err, result) {
            if (err) {
                reject(new Error('Error while getting hospital credentials'))
            }
            if (result.length) {
                reject(new Error('No hospital Found with provided details'))
            }
            resolve(result)
        })
    })
}

exports.getAll = () => {
    return new Promise(function (resolve, reject) {
        const query = `SELECT * FROM Hospital Inner Join HospitalAddress on HospitalAddress.hospital = Hospital.name ;`
        const conn = db.getConnection()
        conn.query(query, function (err, result) {
            if (err) {
                reject(new Error(err.message))
            }
            resolve(result)
        })
    })
}

exports.getHospitalByPinCode = (pinCode) => {
    return new Promise(function (resolve, reject) {
        const query = `SELECT * FROM Hospital  
                       inner JOIN user ON user.email = Hospital.adminEmail AND  user.type = "HospitalManager"
                       Inner JOIN HospitalAddress on HospitalAddress.hospital  = Hospital.name  AND HospitalAddress.pincode = '${pinCode}';`
        const conn = db.getConnection()
        conn.query(query, function (err, result) {
            if (err) {
                conn.end()
                reject(new Error(err.message))
            }
            resolve(result)
        })

    })
}


exports.findOneByUserEmail = (payload) => {
    const query = `SELECT  * from user 
    INNER JOIN Hospital on user.email = Hospital.adminEmail
    Inner JOIN HospitalAddress on HospitalAddress.hospital  = Hospital.name 
    where user.email='${payload}';`
    const conn = db.getConnection()

    return new Promise(function (resolve, reject) {
        conn.query(query, function (err, result) {
            if (err) {
                reject(new Error('Error while getting hospital credentials'))
            }
            if (result.length == 0) {
                reject(new Error('No hospital Found with provided details'))
            }
            resolve(result[0])
        })
        conn.end()
    })
}


exports.getHospitalBed = (hospitalName) => {
    const query = `
    SELECT type,COUNT(type) as number from Bed
    join Hospital on Hospital.name  = Bed.hospital AND Hospital.name ="${hospitalName}" 
    group by type;
    `

    const conn = db.getConnection()

    return new Promise(function (resolve, reject) {

        conn.query(query, function (err, result) {
            if (err) {
                reject(new Error('Error while applying query'))
            }
            if (result.length == 0) {
                reject(new Error('No beds found for this hospital'))
            }
            resolve(result)
        })
    })

}



exports.getHospitalBedDetails = (hospitalName) => {
    const query = `
    SELECT *,Bed.name as bedName from Bed
    left join Hospital on Hospital.name  = Bed.hospital AND Hospital.name ="${hospitalName}"
    Where Bed.available = 1;
    `

    const conn = db.getConnection()
    return new Promise(function (resolve, reject) {

        conn.query(query, function (err, result) {
            if (err) {
                reject(new Error('Error while applying query'))
            }
            if (result.length == 0) {
                reject(new Error('No beds found for this hospital'))
            }
            resolve(result)
        })
    })
}


exports.deleteHospitalBed = (id) => {
    const query = ` 
    Delete from Bed
    where Bed.id=${id}
    `
    const conn = db.getConnection()
    return new Promise(function (resolve, reject) {

        conn.query(query, function (err, result) {
            if (err) {
                console.log(err)
                return reject(new Error('Error while applying query'))
            }
            resolve(result)
        })
    })
}

exports.updateHospitalBed = (id, status) => {
    console.log(id, status)
    const query = ` 
                    UPDATE
                        Bed
                    SET
                        available = ${status}
                    where
                        Bed.id = ${id}
                    `

    const conn = db.getConnection()
    return new Promise(function (resolve, reject) {

        conn.query(query, function (err, result) {
            if (err) {
                console.log(err)
                return reject(new Error('Error while applying query'))
            }

            if (result && result.length == 0) {
                return reject(new Error('No beds found for this hospital'))
            }
            resolve(result)
        })
    })
}



exports.createHospitalBeds = (payload) => {
    console.log(payload)
    const query =
        `INSERT INTO hospital.Bed (name,type , available,  hospital) VALUES('${payload.name}', '${payload.type}',1,'${payload.hospitalName}')`;
    const conn = db.getConnection()

    return new Promise(function (resolve, reject) {

        conn.query(query, function (err, result) {
            if (err) {
                console.log(err)
                reject(new Error('Error while applying query'))
            }
            resolve(result)
        })
    })

}

exports.updateHospital = (payload) => {
    console.log(payload)
    const query = `
    UPDATE Hospital 
    Inner JOIN HospitalAddress on HospitalAddress.hospital  = Hospital.name 
    SET HospitalAddress.address = '${payload.address}',
    	HospitalAddress.state ='${payload.state}', HospitalAddress.city ='${payload.city}',
    	HospitalAddress.pincode ='${payload.pinCode}'
    WHERE Hospital.name= '${payload.hospitalName}';	
    `

    const conn = db.getConnection()
    return new Promise(function (resolve, reject) {

        conn.query(query, function (err, result) {
            if (err) {
                reject(new Error('Error while applying query'))
            }
            console.log(result)
            resolve(result)
        })
    })
}


exports.getSlots = (payload) => {
    const query = `
    SELECT *, Hospital.adminEmail as adminEmail FROM Slot
    INNER JOIN Hospital on Hospital.name  = Slot.hospital
    INNER JOIN user on Slot.userEmail = user.email 
    INNER JOIN  HospitalAddress on Slot.hospital = HospitalAddress.hospital 
    where userEmail = '${payload}';


    `
    const conn = db.getConnection()
    return new Promise(function (resolve, reject) {

        conn.query(query, function (err, result) {
            if (err) {
                reject(new Error('Error while applying query'))
            }
            console.log(result)
            resolve(result)
        })
    })
}

exports.getSlotsByQuery = (payload) => {
    const query = `
    SELECT *,Hospital.adminEmail as adminEmail,Slot.status as slotStatus  FROM Slot
    INNER JOIN Hospital on Hospital.name  = Slot.hospital
    INNER JOIN user on Slot.userEmail = user.email 
    INNER JOIN  HospitalAddress on Slot.hospital = HospitalAddress.hospital 
    where userEmail = '${payload.email}' And Slot.status in (${payload.status.split(',').map(e => JSON.stringify(e))});`
    const conn = db.getConnection()
    console.log(query)
    return new Promise(function (resolve, reject) {

        conn.query(query, function (err, result) {
            if (err) {
                console.log(err)
                reject(new Error('Error while applying query'))
            }
            resolve(result)
        })
    })
}

exports.getSlotsForHospital = (payload) => {
    const query = `
    SELECT *, Hospital.adminEmail as adminEmail, Slot.id as slotID, Slot.status as slotStatus FROM Slot
    INNER JOIN Hospital on Hospital.name  = Slot.hospital
    INNER JOIN user on Slot.userEmail = user.email 
    INNER JOIN Covid19Questionnaires on Slot.id = Covid19Questionnaires.slot
    INNER JOIN  HospitalAddress on Slot.hospital = HospitalAddress.hospital 
    INNER JOIN Health on Slot.id =  Health.slot
    where Hospital.adminEmail = '${payload.email}' And  Slot.status in (${payload.status.split(',').map(e => JSON.stringify(e))});`

    const conn = db.getConnection()
    return new Promise(function (resolve, reject) {

        conn.query(query, function (err, result) {
            if (err) {
                console.log(err)
                return reject(new Error('Error while applying query'))
            }
            console.log(result)
            resolve(result)
        })
    })
}



exports.getDeactivatedSlots = (payload) => {
    console.log(payload)
    const query = `
    SELECT *, Hospital.adminEmail as adminEmail FROM Slot
    INNER JOIN Hospital on Hospital.name  = Slot.hospital
    INNER JOIN user on Slot.userEmail = user.email 
    INNER JOIN  HospitalAddress on Slot.hospital = HospitalAddress.hospital 
    where userEmail = '${payload}' AND Slot.status='DC'; `
    const conn = db.getConnection()
    return new Promise(function (resolve, reject) {

        conn.query(query, function (err, result) {
            if (err) {
                console.log(err)
                reject(new Error('Error while applying query'))
            }
            console.log(result)
            resolve(result)
        })
    })
}


exports.updateSlot = (payload) => {
    console.log(payload.id)
    console.log(payload)
    console.log('erererer')
    const query = `
    UPDATE Slot SET  status='${payload.status}', bed='${payload.bed || "un-allocated"}'
     WHERE userEmail='${payload.email}' AND Slot.id = '${payload.id}';
    ;`

    const conn = db.getConnection()
    return new Promise(function (resolve, reject) {
        conn.query(query, function (err, result) {
            if (err) {
                return reject(new Error('Error while applying query'))
            }
            return resolve(result)
        })
    })
}


exports.getActiveAndPendingSlots = (email) => {
    console.log(email)
    const query = `
    SELECT
        *
    FROM
        Slot
    INNER JOIN user on
        Slot.userEmail = user.email
    where
        userEmail = '${email}'
        And status IN ('MGAP','AP')
    `

    const conn = db.getConnection()
    return new Promise(function (resolve, reject) {
        conn.query(query, function (err, result) {
            if (err) {
                reject(new Error('Error while applying query'))
            }
            if (result && result.length >= 1) {
                reject(new Error('active slots exists'))
            }
            console.log(email)
            return resolve("No slot available")
        })
    })
}


exports.getActiveSlotsForHospital = (email) => {
    const query = `
    SELECT *, Hospital.adminEmail as adminEmail, Bed.name as bedName, Bed.type as bedType,Slot.id as slotId FROM Slot
    INNER JOIN Hospital on Hospital.name  = Slot.hospital
    INNER JOIN user on Slot.userEmail = user.email 
    INNER JOIN Bed on Slot.bed = Bed.id
    INNER JOIN Covid19Questionnaires on Slot.id = Covid19Questionnaires.slot
    INNER JOIN  HospitalAddress on Slot.hospital = HospitalAddress.hospital 
    INNER JOIN Health on Slot.id =  Health.slot
    where Hospital.adminEmail = '${email}' And Slot.status='AP';`

    const conn = db.getConnection()
    return new Promise(function (resolve, reject) {

        conn.query(query, function (err, result) {
            if (err) {
                console.log(err)
                return reject(new Error('Error while applying query'))
            }
            resolve(result)
        })
    })
}


exports.getAmbulance = (name) => {

    const query = `
    SELECT Hospital.name as hospitalName,Ambulance.name,Ambulance.number  from Ambulance
    Join Hospital on Hospital.name = Ambulance.hospital
    where Hospital.name = '${name}' ;`

    const conn = db.getConnection()
    return new Promise(function (resolve, reject) {

        conn.query(query, function (err, result) {
            if (err) {
                console.log(err)
                return reject(new Error('Error while applying query'))
            }
            resolve(result)
        })
    })
}

exports.deleteAmbulance = (name) => {

    const query = `
    Delete from Ambulance 
    Where name = '${name}'
    ;`

    const conn = db.getConnection()
    return new Promise(function (resolve, reject) {

        conn.query(query, function (err, result) {
            if (err) {
                console.log(err)
                return reject(new Error('Error while applying query'))
            }
            resolve(result)
        })
    })
}


exports.createAmbulance = (payload) => {

    const query = `
    INSERT INTO hospital.Ambulance
    (number, hospital, name)
    VALUES('${payload.number}', '${payload.hospitalName}', '${payload.name}');
    ;`

    const conn = db.getConnection()
    return new Promise(function (resolve, reject) {

        conn.query(query, function (err, result) {
            if (err) {
                console.log(err)
                return reject(new Error('Error while applying query'))
            }
            resolve(result)
        })
    })
}

exports.getHospitalSlotDetails = (email) => {

    const query = `
    SELECT
    COUNT(case when Slot.status = 'MGAP' then 1 else null end) as waiting,
	COUNT(case when Slot.status = 'AP' then 1 else null end) as approved ,
	COUNT(case when Slot.status = 'DS' then 1 else null end) as discharged,
	COUNT(case when Slot.status = 'DC' then 1 else null end) as deceased,
	COUNT(case when Slot.status = 'DA' then 1 else null end) as deactivated
    from
        Slot
    JOIN Hospital on
        Hospital.name = Slot.hospital
        AND Hospital.adminEmail = '${email}'
    GROUP BY
        Slot.hospital
    `

    const conn = db.getConnection()
    return new Promise(function (resolve, reject) {
        conn.query(query, function (err, result) {
            if (err) {
                console.log(err)
                return reject(new Error('Error while applying query'))
            }
            resolve(result)
        })
    })
}

