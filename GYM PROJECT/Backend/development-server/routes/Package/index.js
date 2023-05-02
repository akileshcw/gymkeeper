const express = require('express')
const router = express.Router()
const {add_package} = require('../../controller/Package-Controller')

router.post('/add_package',
  add_package
)

module.exports = router