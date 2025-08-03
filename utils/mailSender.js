const nodemailer  = require('nodemailer');

const mailSender = async (email, title, body) => {
    try{
      let transporter = nodemailer.createTransport({
        host : process.env.EMAIL_HOST,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,

        }
      })  
      let info = await transporter.sendMail({
        from: 'ConnectX',
        to:` ${email}`,
        subject: `${title}`,
        html: `${body}`,
      })
      console.log(info);
      return info;
      }catch (error) {
        console.error("Error sending email:", error);
    }
 }