const express = require('express')
const router = express.Router()
//Import workout model
const Workout = require('../models/workoutModel')
// Import Controller
const {
    getworkout,
    getworkouts,
    Createworkout,
    DeleteWorkOut,
    UpdateWortOut

} = require('../controler/workoutController')
const requireAuth = require('../middleware/requireAuth')


router.use(requireAuth)
//Get all workout
router.get('/', getworkouts);

// Get single workout 
router.get('/:id', getworkout)
// Post a new workout
// Single File
// router.post('/', async (req, res) =>{
//     const {title, load, reps} = req.body;

//     try{
//         const workout = await Workout.create({title, load, reps})
//         res.status(200).json(workout)
//     } catch(error){
//         res.status(400).json({error: error.message})
//     }
// })
// Seperate
router.post('/', Createworkout)

// Delete a workout
router.delete('/:id', DeleteWorkOut)
// Update a workout
router.patch('/:id', UpdateWortOut)


module.exports = router;