const mongoose = require('mongoose')

const Product = new mongoose.Schema({
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
    },
    price : {
        type : Number,
        unique : false,
        required : true
    },
    category : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("product", Product)