const express = require('express')
const router = express.Router()
//ImportController
const {
    loginUser,
    SignupUser
} = require('../controler/userController')

//login
router.post('/login', loginUser)

//signup
router.post('/signup', SignupUser)


module.exports = router;