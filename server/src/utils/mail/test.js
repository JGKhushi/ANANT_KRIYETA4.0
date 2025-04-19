const sendMail = require('./sendEmail');
const sendAllNGO = require('./sendAllNGO');


const main = async () => {
  await sendAllNGO();
}

main().catch(console.error);