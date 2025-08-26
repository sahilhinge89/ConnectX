const Section = require('../models/Section');
const Course = require('../models/Course');
 
exports.createSection = async (req ,res) =>{
    try {
        // data fetch
        const {sectionName,courseId} = req.body;
        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success :false,
                message : 'Missing Properties'
            })
        }
        // create section
        const newSection  = await Section.create({sectionName});

        // update course with section objectId
        const updatedCourseDetails = await Course.findById(courseId,{$push:{courseContent:newSection._id},new:true})
        //HW: use populate to replace section / subsection both in updatedCourseDetails
        //return response
        return res.status(200).json({
            success : true,
            message:'Section created successfully',
            updatedCourseDetails,
        })
  

    } catch (error) {
        return res.status(500).json({
            success :false,
            message:"Unable to Create Section, please try again"
        })
    }
}

exports.updateSection = async (req,res) =>{
    try{
        //data input
        const{sectionName,sectionId} = req.body;

      // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success :false,
                message : 'Missing Properties'
            })
        }
        // update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        //return res
        return res.status(200).json({
            success:true,
            message :'Section Updated Successfully'
        })
    }catch(error){
           return res.status(500).json({
            success :false,
            message:"Unable to Update Section, please try again"
        })
        
        
    }
}

exports.deleteSection = async(req,res) =>{
    try {
        //getID -assuming that we are sending ID in params
        const {sectionId} = req.params


        //use findByIdandDelete
        await Section.findByIdAndDelete(sectionId);

        //retrun res
        return res.status(200).json({
            success:true,
            message:'Section Deleted Successfully'
        })
        
    } catch (error) {
           return res.status(500).json({
            success :false,
            message:"Unable to Delete Section, please try again"
        })
    }
}