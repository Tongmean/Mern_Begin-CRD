const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
// Get all workout
const getworkouts = async (req, res) =>{
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}


// Get single workout
const getworkout = async (req, res) =>{
    const { id } = req.params
    // Mongoose validation
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


// Create new workout
const Createworkout = async (req, res) =>{
    const {title, load, reps} = req.body;
    //Form validation
    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('Load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill all Field',emptyFields})
    }

    try{
        //Add new docs to DB
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}


// Delete Workout
const DeleteWorkOut = async (req, res) =>{
    const { id } = req.params
    // Mongoose validation
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(404).json({error: 'No such workout'})

    }
    res.status(200).json(workout)


}


// Update Workout
const UpdateWortOut = async (req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such workout'})
    }

    const workout = await Workout.findByIdAndUpdate({_id: id}, {...req.body})

    if (!workout){
        return res.status(400).json({error: 'NO Such workout'})
    }

    res.status(200).json(workout)
}

module.exports ={
    getworkout,
    getworkouts,
    Createworkout,
    DeleteWorkOut,
    UpdateWortOut

}