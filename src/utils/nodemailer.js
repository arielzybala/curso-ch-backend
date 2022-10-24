const nodemailer = require("nodemailer");
const { logger } = require("./logger");

module.exports.handleEmail = async (data, address, message) => {
  data = `${message}: ${JSON.stringify(data)}`;
  address = JSON.stringify(address);
  const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.USERNM,
      pass: process.env.PASSNM,
    },
  });
  //el pas queda de variable de entorno
  const matter = "HardwareBuls"; 
  const content = data; 
  const receptor = address; 

  let options = {
    from: `HardwareBulls <${process.env.USERNM}>`,
    to: receptor,
    html: content,
    subject: matter,
  };
  try{
    await transport
      .sendMail(options)
      .then((result) => {
        logger.info(result);
      })
  } catch {
    logger.error(`No pudo ser envíado el correo`)
  }
};

