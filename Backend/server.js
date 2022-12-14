//call express
const express = require('express');
// app express
const app = express();
require('dotenv').config()
const port = process.env.PORT||8000;
//Import Route module
const workoutRoutes = require('./routes/workouts')
const userRouter = require('./routes/user')
// Call mongoose
const mongoose = require('mongoose')
//Connect to db by call modules
const dbconnect = require('../Backend/db/dbconnect')

//Call cors
const cors = require('cors')
//Middleware
app.use(cors())

app.use((req, res, next) =>{
    console.log(req.path, req.method);
    next();
})
app.use(express.json())

// Route form seperate files
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRouter)
//route in the same file
app.get('/',(req, res)=>{
    res.json({"meg":"welcome"})
})


//listen port
app.listen(port, (req, res) => {
    console.log('Your server run on port', port)
})