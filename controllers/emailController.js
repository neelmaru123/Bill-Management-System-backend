const nodemailer = require('nodemailer');

async function sendEmail(email, otp) {
  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail's service
    auth: {
      user: 'jb0208379@gmail.com', // Your email
      pass: 'dmvu buws whea poxj', // Your password
    },
  });

  // Set up email data
  let mailOptions = {
    from: 'jb0208379@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Password Reset OTP', // Subject line
    text: `Your OTP is: ${otp}`, // plain text body
  };

  // Send the email
  let info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
}

sendEmail('recipient-email@gmail.com', '123456');

const sendOTP = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log('OTP:', otp);
    
    // Send the OTP to the user's email
    await sendEmail(email, otp);
    
    res.json({ otp });
};

module.exports = { sendOTP };
