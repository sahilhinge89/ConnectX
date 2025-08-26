const mongoose = require('mongoose');
const { type } = require('os');
const courseSchema = new mongoose.Schema({
    instructor: {
         type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
    },
   coruseName:{
    type:String,
    required:true
   },
   courseDescription:{
    type:String,
    required:true
   },
   instrucrtorName:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
},

whatYouWillLearn:{
    type:String, 
},
courseContent :{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Subsection',
    required:true   

},
ratingAndReviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RatingAndReview',
    required: true
}],
thumbnail:{
    type:String,

},
tag:{
 type:[String],
 require:true
},
category:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Category',
},
studentsEnrolled: [{
    type: mongoose.Schema.Types.ObjectId,       
    ref: 'User',
    required: true  
}],
instructions:{
    type:String,
   
},
status:{
      type:String,
     enum:["Draft"," Published"],
}
});
module.exports = mongoose.model('Course', courseSchema);