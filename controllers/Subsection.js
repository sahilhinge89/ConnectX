const Subsection = require("../models/SubSection");
const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

//create Subsection

exports.createSubSection = async (req , res) =>{
    try {
        // fetch data
        const {sectionId, title ,timeDuration ,  description} =req.body;

        // extract file/video
        const video = req.files.videoFile;
        //validation
        if(!sectionId ||  !title ||!timeDuration ||  !description || !video){
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
            description: description,
            videoUrl:uploadDetails.secure_url
        })
        // update section with this sub section ObjectID
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { $push: { subSection: SubSectionDetails._id } }, 
        ).populate("subSection");
       
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
// updateSubsection
 exports.updateSubSection = async (req,res) =>{
    try {
        const {sectionId,SubSectionId, title, description} =req.body;
        const subSection = await Subsection.findById(subSectionId);
        if (!subSection){
            return res.status(404).json({
                success:false,
                message:'subsection not found',
            })
        }
        if(title !== undefined ){
            subSection.title = title;
        }
        if (description !== undefined ){
            subSection.description = description;

        }
        // if you want to update the video file
         await subSection.save();
         const updatedSection = await Section.findById(sectionId).populate('subSection')

         return res.json({
            success:true,
            message: "Section updated successfully",
             data: updatedSection,
         });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message: 'An error occurred while updating the section',
        })
    }
 }
//  deleteSubsection

exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;

        // remove the subsection reference from the parent section 
        await Section.findByIdAndUpdate(
            sectionId,
            { $pull: { subSection: subSectionId } }
        );

        const subSection = await Subsection.findByIdAndDelete(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }
        
       
        const updatedSection = await Section.findById(sectionId).populate("subSection");

        return res.json({
            success: true,
            message: "Subsection deleted successfully",
            data: updatedSection, // FIX: Return the defined updatedSection variable
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the SubSection",
            error: error.message,
        });
    }
};