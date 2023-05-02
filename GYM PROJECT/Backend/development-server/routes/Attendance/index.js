const express = require('express')
const router = express.Router();
const {Auth} = require('../../repository/Authentication');
const {getAttendance, postAttendance} = require('../../controller/Attendance-Controller')
// get attendance details 

router.get(
    '/attendance',
    Auth,
    getAttendance
);

router.post(
    '/attendance_post',
    Auth,
    postAttendance
);

module.exports = router