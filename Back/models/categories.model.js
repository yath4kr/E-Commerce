const mongoose = require('mongoose')

const Category = new mongoose.Schema({
    title : {
        type : String,
        unique : false,
        required : true
    },
    description : {
        type : String,
        unique : true,
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

module.exports = mongoose.model("category", Category)