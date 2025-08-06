const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const { sendEmail } = require('../utils/emailSender');
const dicebear = require('dicebear');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// send OTP handler function
exports.send.OTP = async (req , res) =>{
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

// signup handler function
exports.singUp  = async(req,res) =>{
    try {
         // data fetch
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        phoneNumber,
        accountType,
    } = req.body;
 
    //data validation
     if(!firstName || !lastName || !email || !password || !confirmPassword || !otp || !phoneNumber ) {
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
    const hahedPassword = await bcrypt.hash(password, 10);
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
        password: hahedPassword,
        accountType,
        contactNumber,
        additionalDetails: profileDetails,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    }
    

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


// change password handler function
exports.changePassword = async (req, res)=>{
    try {
           // get data from request body

 //get oldpassword, newPassword, confirmPassword
 
 // validate data

 // update password in database

 // send mail - password changed successfully


 //return response
    } catch (error) {
        
    }
 
}