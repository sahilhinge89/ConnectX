const Profile = require ('../models/Profile');
const User =  require ( '../models/User');

exports.updateProfile  = async(req,res) =>{
    try {
        //get data
        const {dateOfBirth="", about="", contactNumber,gender} = req.body;
         
        //get user
        const  id = req.user.id
        
        //validation
        if(!contactNumber ||!gender ||!id){
            return res.status(400).json({
                success:false,
                message:'All fileds are required',
            });
        }
        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails  = await Profile.findById(profileId);
        //update profile
        profileDetails.dateOfBirth =dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber =contactNumber;
        await profileDetails.save();
        //return response
        return res.status(200).json({
            success:true,
            message:'Profile Updated Successfully'
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}

// deleteAccount

exports.deleteAcount = async (req,res) =>{
    try {
        // get id
        const id = req.user.id;
        // validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success : false,
                message: 'User not found',

            });
        }
        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails>additionalDetails});

        // delete user
        await User.findByIdAndDelete({id:id});
        // response

         return res.status(200).json({
            success:true,
            message:'User Deleted Successfully',
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'User Cannot be Deleted Successfully',
        })
    }
}

exports.gellAllUserDetails = async (req,res)=>{
    try {
        // get id
        const id = req.user.id;
        // validation and get user details
        const userDetails = await User.findById(id).populate("additionDetails").exec();

        //return response
      return res.status(200).json({
            success:true,
            message:'User Data Fetched  Successfully'
        })

    } catch (error) {
         return res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}