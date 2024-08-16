const mongoose = require('mongoose')

const studentSchemal = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    gpa:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }
})
module . exports = mongoose.model("student",studentSchemal)