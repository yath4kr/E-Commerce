const mongoose = require('mongoose')

const AdminUser = new mongoose.Schema({
    name : {
        type : String,
        unique : false,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    }, 
    password : {
        type : String,
        required : true
    },
    pic : {
        type : String,
        required : true
    },
    addedOn :{
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("adminUser", AdminUser)