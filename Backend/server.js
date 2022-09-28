//call express
const express = require('express');
// app express
const app = express();
const port = process.env.PORT||8000;
//Import Route module
const workoutRoutes = require('./routes/workouts')
// Call mongoose
const mongoose = require('mongoose')
require('dotenv').config()
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
//route in the same file
// app.get('/',(req, res)=>{
//     res.json({"meg":"welcome"})
// })

//Connect to db
mongoose.connect(process.env.MONG_URI)
.then(()=>{
    console.log('Conect db seccessfully')
})
.catch((error)=>{
    console.log(error)
})

//listen port
app.listen(port, (req, res) => {
    console.log('Your server run on port', port)
})