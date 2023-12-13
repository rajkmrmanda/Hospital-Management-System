const Admin = require('../models/admin.js')

exports.getAnalytics = async (req, res) => {
    try {
        return Admin.getAnalytics().then(result => res.json(result))
            .catch(err => res.status(400).json(err.message))
    } catch {
        res.status(500).json("Internal server Error")
    }
}

exports.getAdminHospitals = async (req, res) => {
    try {
        return Admin.getHospitalsForAdmin().then(result => res.json(result))
            .catch(err => res.status(400).json(err.message))
    } catch {
        res.status(500).json("Internal server Error")
    }
}

exports.getAdminUsers = async (req, res) => {
    try {
        return Admin.getUsers().then(result => res.json(result))
            .catch(err => res.status(400).json(err.message))
    } catch {
        res.status(500).json("Internal server Error")
    }
}