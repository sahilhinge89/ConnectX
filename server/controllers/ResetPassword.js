const User  = require ("../models/User");
const mailSender  = require("../utils/mailSender");
const bcrypt = require("bcrypt");


// resetPasswordsToken 
exports.resetPasswordToken  = async (req,res) =>{
    try {
      // get email from req body
      const {email} =req.body;

      // validation
     const user = await User.findOne({email:email});
     if (!user){
        return res.status(401).json({success : false,
            message:'Your Email is not registered '
        })
     }
      // generate token  
      const token = crypto.randomUUID();
      // update user by adding token and expiration time
       const updatedDetails = await User.findOneAndUpdate({email:email},{
        token:token,
        resetPasswordExpires:Date.now()+ 5*60*1000,
       },{new:true});
      // create url
      const url = `http://localhost:3000/update-password/${token}`
      //send mail containing the url
      await mailSender(email,"Password Reset Liunk",`Password Reset Link :${url}`);
      // return response
       
    return res.json({
         success:true,
         message :'Email sent successfully, please check email and change password' 
    })
  
  
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:'Something went wrong'
    })
  }
}

exports.resetPassword = async (req,res) =>{
try {
    // data fecth
const {password,confirmPassword, token} = req.body;
// validation
if(password !== confirmPassword){
    return res.json({
        success: false,
        message:'Passsword not Matching',

    })
}
//get Userdetails from db using token
const userDetails = await user.findOne({token:token});

// if no enty - invalid token
if(!userDetails){
    return res.json({
        success:false,
        message:'Token is invalid',
    })
}
// check token time 
if(userDetails.resetPasswordExpires< Date.now()){
    return res.json({
        success:false,
        message :'Token is Expired, please regenerate your token'


    })
}
// hash password
const hashedPassword = await bcrypt.hash(password,10);

// update password
await User.findOneAndUpdate({token:token}, {password:hashedPassword},{new:true});
// return response
return  res.status(200).json({
    success:true,
    message :'Password reset successfully'
  
})
} catch (error) {
     console.log(error);
    return res.status(500).json({
        success:false,
        message:'Something went wrong'
    })
}

}