const Course = require('../models/Course');
const Tag = require('../models/tags');
const User = require('../models/User');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

// create a course handler function
exports.createCourse = async(req, res) => {
    try {
        // fetch the data from the request body
        const{ courseName,courseDescription,  coursePrice,whatyouWillLearn, tags,instructions,status,category } = req.body;

           //get thumbnail
         const thumbnail = req.file.thumbnailImage;
          
          // validate the data
          if(!courseName || !courseDescription || !coursePrice || !thumbnail || !tags|| !whatyouWillLearn || !category ) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required' 
            });
          }
          if (!status || status === undefined) {
			status = "Draft";
		}

          // check  for instructor
          const userId = req.user.id;
            const instructorDetails = await User.findById(userId);
            console.log("Instructor Details:", instructorDetails);
            if(!instructorDetails) {
                return res.status(400).json({
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
            const thumbnailUrl = await uploadImageToCloudinary(thumbnail, process.env. FOLDER_NAME);  
            
            // create a new course
            const newCourse  = await Course.create({
                courseName,
                courseDescription,
                coursePrice,
                thumbnail: thumbnailUrl.secure_url,
                instructor: instructorDetails._id,
                tags: tagDetails._id,
                status: status,
                category: categoryDetails._id,
			instructions: instructions,
            });
            // add the new course to the instructor's courses
            await User.findByIdAndUpdate( {
                _id: instructorDetails._id ,
         },{
            $push: { courses: newCourse._id },

         },
         {new:true},
     );
     // Add the new course to the Categories
     await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);
       
     //return the response
        return res.status(200).json({
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

//getCourseDetails

exports.getCourseDetail = async(req,res) =>{
	try { 
		//get id
	
		const {courseId} = req.body;
		//find the course details

		const courseDetails =  await Course.find({_id:courseId})
												.populate({
													path:'instructor',
													populate:{
														path: additionalDetails,
													},
												}
                                            )		
												.populate('category')
												.populate('ratingAndrewiews')
												.populate({
													path:"courseContent",
                                                    populate:{
                                                        path:"subSection"
                                                    }
												})
												.exec();	
			
			//validation
			if(!courseDetails){
				  return res.status(400).json({
                        success:false,
                        message:`Could not find the course with ${courseId}`,
                    });
			}	
			// return response
			 return res.status(200).json({
                    success:true,
                    message:"Course Details fetched successfully",
                    data:courseDetails,
                })								
			} catch (error) {
		   console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
	}
}