const Hospital = require('../models/hospital')


exports.hospitalsList = async (req, res) => {
    try {
        Hospital.getAll().then(value => res.json(value))
            .catch(err => res.status(500).json({
                error: err
            }))
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getHospitals = async (req, res) => {
    try {
        Hospital.getHospitalByPinCode(req.query['pinCode'])
            .then(value => res.json(value))
            .catch(err => res.status(500).json({
                error: err
            }))
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.checkHospital = async (req, res) => {

    try {
        Hospital.findOneByUserEmail(req.body.email)
            .then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.getHospitalBeds = async (req, res) => {
    try {
        Hospital.getHospitalBed(req.query['hs'])
            .then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getHospitalBedDetails = async (req, res) => {
    try {
        Hospital.getHospitalBedDetails(req.query['hs'])
            .then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.createHospitalBeds = async (req, res) => {
    try {
        Hospital.createHospitalBeds(req.body)
            .then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.updateHospitalBeds = async (req, res) => {
    try {
        Hospital.updateHospitalBed(req.body.id, req.body.status || 0)
            .then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.updateHospital = async (req, res) => {
    try {
        Hospital.updateHospital(req.body.hospitalDetails).then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getSlotDetails = async (req, res) => {
    try {
        data = {
            'email': req.user.username,
            "status": req.query.status || "MGAP"
        }
        Hospital.getSlotsByQuery(data).then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.getDeactivatedSlotDetails = async (req, res) => {
    try {
        console.log(req.user)
        Hospital.getDeactivatedSlots(req.user.username).then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}


exports.getSlotsForHospital = async (req, res) => {
    try {
        data = {
            'email': req.user.username,
            "status": req.query.status || "MGAP"
        }
        Hospital.getSlotsForHospital(data).then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.updateSlotDetails = async (req, res) => {
    try {
        Hospital.updateSlot(req.body).then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}


exports.getActiveAndPendingSlots = async (req, res) => {
    try {
        if (req.user.type) {
            return res.status(400).json('Hospital manager cannot book a slot')
        }
        Hospital.getActiveAndPendingSlots(req.user.username).then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.getActiveSlots = async (req, res) => {
    try {
        Hospital.getActiveSlotsForHospital(req.user.username).then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}


exports.deleteHospitalBed = async (req, res) => {
    try {
        Hospital.deleteHospitalBed(req.params.id).then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.getAmbulance = async (req, res) => {
    console.log(req.params.id)
    try {
        Hospital.getAmbulance(req.params.id).then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
exports.deleteAmbulance = async (req, res) => {
    console.log(req.params.id)
    try {
        Hospital.deleteAmbulance(req.params.id).then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}


exports.createAmbulance = async (req, res) => {
    console.log(req.body)
    try {
        Hospital.createAmbulance(req.body).then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.getHospitalSlotDetails = async (req, res) => {
    try {
        Hospital.getHospitalSlotDetails(req.user.username).then(value => res.json(value))
            .catch(err => res.status(400).json({
                error: err.message
            }))
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}