const prisma = require('../../../prisma/client');
const sendEmail = require('../mail/sendEmail');


// get all NGO and send email to them
const ngos = async () => {
  return await prisma.ngo.findMany({
    select: {
      email: true,
    },
  });
}

const sendAllNGO = async () => {
  const ngosList = await ngos();
  const emails = ngosList.map(ngo => ngo.email);
  const subject = 'New Donation Alert!';
  const message = 'Hello, we have a new donation for you! Please check your dashboard for more details.';
  
  try {
    for (const email of emails) {
      await sendEmail(email, subject, message);
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendAllNGO;