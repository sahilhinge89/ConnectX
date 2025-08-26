const mongoose = require ('mongoose');
const mailSender = require('../utils/mailSender');
 const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '5m'
    }
});

// a function -> to send email
async function sendVerficationEmail(email, otp){
    try {
        const mailResponse  = await mailSender(email, 'OTP Verification from ConnectX', `<h1>Your OTP is ${otp}</h1>`);
        return mailResponse;
    }catch (error) {
        console.error("Error sending verification email:", error);
        throw error;

    }
}

OTPSchema.pre('save', async function(next){
    await sendVerficationEmail(this.email, this.otp);
    next();
})
module.exports = mongoose.model('OTP', OTPSchema);