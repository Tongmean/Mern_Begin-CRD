//Call mongoose
const mongoose = require('mongoose')
//INvoke Schima
const Schema = mongoose.Schema

const userSchema = new Schema{
    email:{
        type: email,
        required: true,
        unique: true
    },
    password:{
        type:password,
        
    }
}