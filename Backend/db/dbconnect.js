const mongoose = require('mongoose')
const dbconnect = mongoose.connect(process.env.MONG_URI)
    .then(()=>{
        console.log('Conect db seccessfully')
    })
    .catch((error)=>{
        console.log(error)
})

module.exports = dbconnect;