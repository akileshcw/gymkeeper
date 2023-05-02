const express = require('express')
const router = express.Router()
const {add_organization,organization_get} = require('../../controller/Organization-Controller')

router.post(
  '/add_org',
  add_organization
)

router.get(
  '/org_get',
  organization_get
)

module.exports = router