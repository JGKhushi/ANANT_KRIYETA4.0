const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "zerobite.soit@gmail.com",
    pass: "oykz dcgs ecyx qigp",
  }
});


const sendEmail = async (to, subject, message) => {
  try {
    const mailOptions = {
      from: 'zerobite.soit@gmail.com',
      to,
      subject,
      text: message,
    }

    const info = await transporter.sendMail(mailOptions)
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;