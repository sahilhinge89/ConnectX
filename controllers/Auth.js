
const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const passwordUpdateTemplate= require('../mail/templates/passwordUpdate');
const Profile = require('../models/Profile');
// const dicebear = require('dicebear');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const Profile = require('../models/Profile')
const mailSender = require("../utils/mailSender");
require('dotenv').config();


// signup handler function
exports.signup = async(req,res) =>{
    try {
        // data fetch
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
        contactNumber,
        accountType,
    } = req.body;
    
    //data validation
    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp || !contactNumber )
 {
        return res.status(400).json({
            success: false,
            message: 'Please fill all the fields'
        });
    }
    
    // comparing 2 passwords
    if(password !== confirmPassword){
        return res.status(400).json({
            success :false,
            message: 'Passwords do not match'
        })
    }
    // check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success: false,
            message: 'User already exists'

        });
    }
    //find most recent OTP
    const recentOTP = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if(!recentOTP){
        return res.status(400).json({
            success: false,
            message: 'OTP not found'
        });
    }
    
    //check if OTP is valid
    if(recentOTP.otp !== otp ){
        return res.status(400).json({
            success: false,
            message: 'Invalid OTP'
        })
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create a new user in database
    const profileDetails = {
        gender:null,
        about: null,
        dateOfBirth: null,
        contactNumber: null,
    }
    const userPayload ={ 
        firstName,
        lastName,
        email,
        password: hashedPassword,
        accountType,
        contactNumber,
        additionalDetails: profileDetails,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    }
    
    const user = await User.create(userPayload);
    //return response
    return res.status(201).json({
        success: true,
        message: 'User registered successfully',
     
    });

} catch(error){
    console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// login handler function
exports.login = async (req,res)=>{
    try{
        //  get data from request body
        const { email, password } = req.body;
        // validate data
        if(!email || !password){
    return res.status(404).json({
        success: false,
        message: 'please fill all the fields'
    });
   }
   
   // check if user exists
   const user = await User.findOne({email}).populate('additionalDetails');
   if(!user){
       return res.status(404).json({
           success: false,
           message: 'User is not registered, please sign up first'
        })
    }
    
    
   // compare password
   if(await bcrypt.compare(password,user.password)){
        // create payload for JWT
        const payload ={
            email : user.email,
            userId: user._id,
            role: user.accountType, 
        }
        // generate JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
        user.token = token;
        user.password = undefined; // remove password from user object
    
    // create cookie and send response
    const options ={
        httpOnly: true,
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours
    }
    res.cookie("token",token ,options).status(200).json({
        success: true,
        token,
        user,
        message: 'Login successful'
    });
}
    else{
        return res.status(400).json({
            success: false,
            message: 'Invalid credentials'
        });

   }
   
   
}catch(error){
    console.error(error);
    return res.status(500).json({
        success: false,
            message: 'Internal server error'
        });
    }
}


// send OTP handler function
exports.sendOTP = async (req , res) =>{
    try {
        //fetch the email from ther request body

       const { email } = req.body;
        // check if email is alerady exists
        const checkUser = await User.findOne({ email });
        // if user already exists, send error message
        if(checkUser){
            return res.status(400).json({
                success:false,
                message: 'User already exists'
                
            })
        }

        // generate OTP
        let otp  = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false,digits:true});
       console.log("Otp generated: ",otp);
        
       //check is OTP is unique
       const checkOTP = await OTP.findOneAndDelete({otp: otp});
       while(checkOTP){
        otp = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false,digits:true});
       }
       checkOTP = await OTP.findOne({ otp: otp });
       
         // create a new OTP entry in the database
       const otpPayLoad = { email,otp};
        const newOTP  = await OTP.create(otpPayLoad);
        console.log("New OTP created: ", newOTP);
        
     // return response
        return res.status(200).json({
            success:true,
            message:'OTP sent successfullly',
            otp,
        })
    } catch (error) {
        console.log(error);
        // return error response
        return res.status(500).json({
            success:false,
             message: 'Internal server error',
        })

    }
};
// change password handler function
exports.changePassword = async (req, res)=>{
    try {
           // get data from request body
  const userDetails = await User.findById(req.user.id);
 //get oldpassword, newPassword, confirmPassword
 const {oldPassword,newPassword,confirmPassword} = req.body;
 // validate data
const isPaswordMatch = await bcrypt.compare(oldPassword,userDetails.password);
if(!isPaswordMatch){
    //if old password do not match, return a 401 (Unauthorize)
    return res.status(401).json({
        success:false,
        message:"The password is incorrect",
    })
    
}
//Match new password and confirm password
 if(newPassword !== confirmPassword){
    //If new pass word and confirm password do not match, return a 400 (bad request) error
    return res.status(400).json({
        success:false,
        message: 'he password and confirm password does not match',
    })
 }
 // update password in database
 const encryptedPassword = await bcrypt.hash(newPassword,10);
 const updatedUserDetails = await User.findByIdAndUpdate(
    req.user.id,
    {password:encryptedPassword},
    {new:true},
    
 )
 // send mail - password changed successfully
try{
const emailResponse = await mailSender(
    updatedUserDetails.email,
    passwordUpdateTemplate(
        updatedUserDetails.email,
        `Password updated succesfully for${updatedUserDetails.firstName}`,
    )
)
console.log("Email sent successfully:", emailResponse.response);
}catch(error){
// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
}

 //return success response
  return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} 
     catch (error) {
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }
 
}