const Subsection = require("../models/SubSection");
const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
//create Subsection

exports.createSubSection = async (req , res) =>{
    try {
        // fetch data
        const {sectionId, title ,timeDuration ,  decription} =req.body;

        // extract file/video
        const video = req.files.videoFile;
        //validation
        if(!sectionId ||  !title ||!timeDuration ||  !decription || !video){
            return res.status(400).json({
                success:false,
                message:'All Fields are required'
            })

        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        //create a subsection
        const  SubSectionDetails = await Subsection.create({
            title:title,
            timeDuration: timeDuration,
            decription: decription,
            videoUrl:uploadDetails.secure_url
        })
        // update section with this sub section ObjectID
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId}, {$push:(SubSectionDetails._id)},{new:true})
       
        //HW :log updated section here, after adding populate query
       
        // return response
        return res.status(200).json({
            success:true,
            message:'Subsection Created Succesfully',
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
}
// HW : updateSubsection

// HW : deleteSubsection