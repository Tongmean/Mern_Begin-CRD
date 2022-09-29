//Call mongoose
const mongoose = require('mongoose')
//INvoke Schima
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')
const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
        
    }
}, {timestamps: true})
// Static method signup
userSchema.statics.signup = async function(email, password) {
    //Validation
    if(!email || !password){
        throw Error('All field must be fill')
    }
    if(!validator.isEmail(email)){
        throw Error('Email not Valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if(exists){
        throw Error('Email already Exist')
    }
    // For add prefix to the same password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user

}

//static method login
userSchema.statics.login = async function(email, password){

    if (!email || !password){
        throw Error('All Fields must be Fill')
    }

    const user = await this.findOne({ email })

    if(!user){
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user
}

module.exports = mongoose.model('User',userSchema)