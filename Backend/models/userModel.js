//Call mongoose
const mongoose = require('mongoose')
//INvoke Schima
const Schema = mongoose.Schema

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

module.exports = mongoose.model('User',userSchema)