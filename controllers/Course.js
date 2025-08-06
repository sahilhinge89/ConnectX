const Course = require('../models/Course');
const Tag = require('../models/tags');
const User = require('../models/User');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

// create a course handler function
exports.createCourse = async(req, res) => {
    try {
        // fetch the data from the request body
        const{ courseName,courseDescription,  coursePrice,whatyouWillLearn, tags } = req.body;

           //get thumbnail
         const thumbnail = req.file.thumbnailImage;
          
          // validate the data
          if(!courseName || !courseDescription || !coursePrice || !thumbnail || !tags|| !whatyouWillLearn) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required' 
            });
          }

          // check  for instructor
          const userId = req.user.id;
            const instructorDetails = await User.findById(userId);
            console.log("Instructor Details:", instructorDetails);
            if(!instructorDetails) {
                return res.status(404).json({
                    success: false,
                    message: 'Instructor not found'
                });
            }
            //check given tag are valid 
            const tagDetails = await Tag.findById(tag);
            if(!tagDetails) {
                return res.status(404).json({
                    success: false,
                    message: 'Tag Details not found'
                });
            }
            //upload thumbnail to cloudinary
            const thumbnailurl = await uploadImageToCloudinary(thumbnail, process.env. FOLDER_NAME);  
            
            // create a new course
            const newCourse  = await Course.create({
                courseName,
                courseDescription,
                coursePrice,
                thumbnail: thumbnailurl.secure_url,
                instructor: instructorDetails._id,
                tags: tagDetails._id
            });
            // add the new course to the instructor's courses
            await User.findByIdAndUpdate( {
                _id: instructorDetails._id ,
         },{
            $push: { courses: newCourse._id },

         },
         {new:true},
     );
     // uptade the Tag schema with the new course
     //HW
       
     //return the response
        return res.status(201).json({
            success: true,
            message: 'Course created successfully',
            course: newCourse
        });
    } catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        }); 
    }
}

exports.getAllCourses = async (req, res) => {
    try {
        const allCourse = await Course.find({},{
            coruseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnrolled:true

        }).populate('instructor')
        .exec();
        
        return res.status(200).json({
            success: true,
            message: 'All courses fetched successfully',
            courses: allCourse
        });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }

}