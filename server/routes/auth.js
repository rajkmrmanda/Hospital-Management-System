const express = require("express");

const router = express.Router();

const {
    authCheck,
    adminCheck
} = require("../middlewares/auth");

// controller
const {
    currentUser,
    checkUser,
    authentication,
    updatePassword,
} = require("../controllers/auth");

const {
    registration, registerPatientFromUser
} = require('../controllers/registration')

const {
    hospitalsList,
    getHospitals,
    checkHospital,
    getHospitalBeds,
    updateHospital,
    createHospitalBeds,
    getHospitalBedDetails,
    getSlotDetails,
    getDeactivatedSlotDetails,
    updateSlotDetails,
    getSlotsForHospital,
    updateHospitalBeds,
    getActiveAndPendingSlots,
    getActiveSlots,
    deleteHospitalBed,
    getAmbulance,
    deleteAmbulance,
    createAmbulance,
    getHospitalSlotDetails,
} = require('../controllers/hospital');
const { updateUser } = require("../controllers/user");
const { getAnalytics, getAdminHospitals, getAdminUsers } = require("../controllers/admin");




// AUTHENTICATION ROUTERS
router.post("/check-user", checkUser);
router.post('/registration', registration)
router.post('/login', authentication);

// USER ROUTER
router.get("/user", authCheck, currentUser);
router.put("/user", authCheck, updateUser);
router.post('/update-password', authCheck, updatePassword)


// HOSPITALS ROUTERS
router.get("/hospitals-list", hospitalsList);

// HOSPITAL GET AND UPDATE
router.get("/hospitals", getHospitals);
router.put("/hospitals", updateHospital);

// CHECK HOSPITAL EXISTS OR NOT
router.post("/check-hospital", checkHospital);

// GET HOSPITAL BEDS
router.get("/hospital-beds", getHospitalBeds);
router.post("/hospital-beds", createHospitalBeds);
router.put("/hospital-beds", updateHospitalBeds);
router.post('/hospital-bed-list', getHospitalBedDetails)
router.delete('/bed/:id', deleteHospitalBed)

// registration patients
router.post("/register-patient-from-user", registerPatientFromUser);

// Hospital slots
router.get('/slots', authCheck, getSlotDetails)
router.put('/slots', authCheck, updateSlotDetails)
router.get('/hospital-slots', authCheck, getSlotsForHospital)
router.get('/deactivated-slots', authCheck, getDeactivatedSlotDetails)
router.get('/status-slot', authCheck, getActiveAndPendingSlots)
router.get('/approved-slots', authCheck, getActiveSlots)

// admin endpoints 
router.get('/analytics', authCheck, getAnalytics)
router.get('/admin-hospitals', authCheck, getAdminHospitals)
router.get('/admin-users', authCheck, getAdminUsers)


// ambulance 
router.get('/ambulance/:id', authCheck, getAmbulance)
router.delete('/ambulance/:id', authCheck, deleteAmbulance)
router.post('/ambulance', authCheck, createAmbulance)

// hospital patients count
router.get('/hospital-details', authCheck, getHospitalSlotDetails)



module.exports = router;