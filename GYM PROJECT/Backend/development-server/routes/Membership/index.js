const express = require('express');
const router = express.Router();
const {Auth} = require('../../repository/Authentication');
const {
    dashboardHome, 
    getMember,
    addMembership,
    getMembershipsForEdit,
    editMembership,
    getMemberships,
    deleteMembership,
    getAttendance,
    refresh_token
} = require('../../controller/Membership-Controller')

router.get(
    '/members/membership/:uuid',
    Auth,
    getMember
);

router.post(
    '/members/membership/:uuid/add_membership',
    Auth,
    addMembership
);

router.get(
    '/members/membership/:uuid/edit_membership/:id',
    Auth,
    getMembershipsForEdit
);

router.put(
    '/members/membership/:uuid/edit_membership/:id',
    Auth,
    editMembership
);

router.get(
    '/members/memberships',
    Auth,
    getMemberships
);

router.delete(
    '/memberships/delete/:id',
    Auth,
    deleteMembership
);

router.post(
    '/attendance',
    Auth,
    getAttendance
);

module.exports = router