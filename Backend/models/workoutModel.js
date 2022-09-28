//Call mongoose
const mongoose = require('mongoose')
//INvoke Schima
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    reps:{
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('workout', workoutSchema)