const mongoose = require("mongoose");
const { types } = require("util");

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email: {
         type:String,
         required:true,
         unique:true,
         trim: true,
    },
    password: {
        type:String,
        required:true,
        minlength: 6
    },
    accountType: {
        type:String,
        required:true,
        enum: ['Admin', 'Student', 'Instructor'],
        default: 'Student'
    },
    additionalDetails:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Profile'
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    image:{
        type: String,
        required: true,
    },

    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'CourseProgress',
    }]
   
});
 module.exports = mongoose.model("User", userSchema);