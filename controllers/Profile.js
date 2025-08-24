const Profile = require('../models/Profile');
const User = require('../models/User');

// =======================================
// Update Profile
// =======================================
exports.updateProfile = async (req, res) => {
    try {
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
        const id = req.user.id; // from auth middleware

        if (!contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        return res.status(200).json({
            success: true,
            message: 'Profile Updated Successfully',
            profile: profileDetails
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// =======================================
// Delete Account
// =======================================
exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        await Profile.findByIdAndDelete(userDetails.additionalDetails);
        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'User Deleted Successfully',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User Cannot be Deleted',
            error: error.message
        });
    }
};

// =======================================
// Get All User Details
// =======================================
exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec();

        return res.status(200).json({
            success: true,
            message: 'User Data Fetched Successfully',
            data: userDetails
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
// Add this code to the end of your controllers/Profile.js file

// =======================================
// Get Enrolled Courses
// =======================================
exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findOne({ _id: userId })
            .populate("courses") // Assumes your User model has a "courses" array
            .exec();
            
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userId}`,
            });
        }
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// =======================================
// Update Display Picture
// =======================================
exports.updateDisplayPicture = async (req, res) => {
    try {
        // Your logic for uploading a file to a service like Cloudinary goes here
        // const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        
        // const image = await uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000, 1000);
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            // { image: image.secure_url }, // Update with the URL from your upload service
            { image: "https://api.dicebear.com/5.x/initials/svg?seed=new-image" }, // Placeholder
            { new: true }
        );
        
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedUser,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};