const User = require('../models/user')
const Address = require('../models/address')
const Hospital = require('../models/hospital');
const {
    createHealthDetails,
    createEmergencyDetails,
    createSlot,
    createCovidQuestions
} = require('../models/register');
const { response } = require('express');

// helps to validate user.
const validateUser = async (body, res) => {
    // this is normal user 
    const checkFields = ['firstName', 'lastName', "birthDate", 'contact', 'gender'];

    // validators
    checkFields.map((fieldName) => {
        // checks weather fields exists or not if not returns error
        if (!body.hasOwnProperty(fieldName)) {
            return res.status(400).json({
                'error': `field with name ${fieldName} not found`
            })
        }

        // checks field is empty or not
        if (body[fieldName] === "" | body[fieldName] === null) {
            return res.status(400).json({
                'error': `field with name ${fieldName} is empty`
            })
        }
    })
}




exports.registration = async (req, res) => {
    const body = req.body.userDetails.basicDetails;
    const email = req.body.userDetails.basicDetails.email

    if (!email) {
        res.status(400).json({
            'error': "email not found"
        })
    }

    // get user 
    const user = await User.findOne({
        email: email
    });

    // check user exists or not
    if (!user == "User not found") {
        res.status(400).send(`User With this email ${email} already exists`)
    }

    // validates user
    validateUser(body, res)

    // add user to database
    await User.createNormalUser(body, res).then(
        (msg) => {
            console.log('user created')
        }
    ).catch(
        (err) => {
            console.log(err)
            res.status(500).json({
                error: err.message
            })
        }
    )

    // create address
    if (body.type === "User") {
        await Address.createAddress(req.body.userDetails.addressDetails, email)
            .then(msg => res.json('user created successfully'))
            .catch(msg => res.status(400).json(msg))

    }
    // hospital manager
    if (body.type === 'HospitalManager') {
        await Hospital.createHospital(body, email).then(
            result => {
                Address.createHospitalAddress(req.body.userDetails.addressDetails, req.body.userDetails.basicDetails.hospitalName)
                    .then(result => res.json("created success fully"))
                    .catch(err => res.status(400).json(err.message))


            }
        ).catch(err => res.status(500).json(err.message))
    }
}


exports.registerPatientFromUser = async (req, res) => {
    try {
        const {
            patientDetails,
            slug
        } = req.body;
        createSlot(patientDetails, slug).then(
            result => {
                console.log(result.insertId)
                createHealthDetails(patientDetails, result.insertId).then(
                    res => console.log("created healthy details")
                ).catch(err => console.log(err))
                createEmergencyDetails(patientDetails, result.insertId).then(
                    res => console.log("created emergency details")
                ).catch(err => console.log(err))
                createCovidQuestions(patientDetails, result.insertId).then(
                    res => console.log("created emergency details")
                ).catch(err => console.log(err))
                createBMI(patientDetails, result.insertId).then(
                    res => console.log("created BMI details")
                ).catch(err => console.log(err))
                createMedication(patientDetails, slug, result.insertId).then(
                    res => console.log("created medications details")
                ).catch(err => console.log(err))
                createHealthIssues(patientDetails, result.insertId).then(
                    res => console.log("created health issues details")
                ).catch(err => console.log(err))
                createCovidSymptoms(patientDetails, result.insertId).then(
                    res => console.log("created covid symptoms details")
                ).catch(err => console.log(err))

                return res.json("Slot Created SUccessfully")

            }
        ).catch(err => console.log(err))

    } catch (error) {
        res.status(500).json(error)
    }
}