const mongoose = require('mongoose');

const courseProgress = new mongoose.Schema({
courseId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
},
completedVideos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subsection',
    required: true
}],
});

module.exports = mongoose .model("CourseProgress", courseProgress);