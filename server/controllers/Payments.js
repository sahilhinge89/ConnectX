const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require ('../utils/mailSender');
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const {defaul:mongoose} = require('mongoose');

// capture the payment and initiate the Razorpay order

exports.capturePayment = async (req,res) =>{
    // get courseId and userId
        const {course_id} = req.body;

        const  userId = req.user.id;

    // validation

    // validaton courseId
    if (!course_id){
        return res.json({
            success : false,
            message :'Please provide valid course ID'
        })
    }
    // valid courseDetail
     let course;
     try {
        course = await Course.findById(course_id);
        if(!course){
            return res.json({
            success : false,
            message :'Could not find the course',
        })
    }
    // user already pay for the same course
     const uid = new mongoose.Types.ObjectId(userId);
     if(course.studentsEnrolled.includes(uid)){
        return res.status(200).json({
            success:false,
            message: 'Student is already enrolled',
        })
     }
     } catch (error) {
       console.error(error);
       return res.status(500).json({
        success : false,
        message: error.message,
       }) 
     }

    // order create 
    const amount = course.price;
    const currency = "INR";
    const option ={
        amount :amount * 100,
        currency,
        receipt :Math.random(Date.now().toString()),
        notes:{
            courseId: course_id,
            userId,
        }
    }

    try {
        // initiate the payment using Razorpay
        const paymentResponse = await instance.orders.create(option);
        console.log(paymentResponse);
           // return response
          
       return res.status(200).json({
        success : true,
        courseName: courseName,
        courseDescription :courseDescription,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency:paymentResponse.currency,
        amount:paymentResponse.amount,

        message: error.message,
       }) 
    } catch (error) {
         console.log(error);
        res.json({
        success : false,
        message: 'Colud not initiate order',
       }) 
    }

}

// verify Signature of Razorpay and server

exports.verifySignature = async (req,res)=>{
    // this is my secrect key
    const webhookSecret = '123456789';
    

   //  this signature comes from razoryPay
   
   const signature = req.headers['x-razorpay-signature'];

  const shasum = crypto.createHmac("sha256",webhookSecret); 

  shasum.update(JSON.stringify(req.body));

  const digest = shasum.digest('hex');

  if(signature === digest){
    console.log("Payment is Authorised");

    const {courseId,userId} = req.body.payload.payment.entity.notes;
    try {
        // fulfill the action
        
        // find the course and enroll the student it
        const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true});
        
        if(!enrolledCourse){
               return res.status(500).json({
            success:false,
            message:"Course not Found",
        
        })
    }
    console.log(enrolledCourse)
   // find the student and add the course to their list enrolled course
    const enrolledStudent = await User.findOneAndUpdate({_id:userId},{$push:{course:courseId}},{new:true})
      console.log(enrolledStudent);

      // confirmation mail send to the user about purchase course
        const emailResponse = await mailSender(enrolledStudent.email,"Congratualtions for ConnectX",'Congratulation , you are onboarded into ConnectX Course');
        console.log(emailResponse);
           return res.status(200).json({
            success:true,
            message:"Signature Verified and Course Added",
           
        }) 
    } catch (error) {
           return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
  } 
  else {
       return res.status(400).json({
            success:false,
            message:"Internal request",
         
        })
  }
}