const User = require('../models/userModel')
//Loginuser
const loginUser = async (req, res) =>{
    res.json({"meg":"login"})
}

//SignupUser
const SignupUser = async (req, res) =>{
    res.json({"meg":"signup"})

}

module.exports ={
    loginUser,
    SignupUser
}