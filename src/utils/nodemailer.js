const nodemailer = require("nodemailer");
const { logger } = require("./logger");

module.exports.handleEmail = async (data, addressee, message) => {
  data = `${message}: ${JSON.stringify(data)}`;
  addressee = JSON.stringify(addressee);
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
  const receptor = addressee; 

  let opciones = {
    from: `HardwareBulls <${process.env.USERNM}>`,
    to: receptor,
    html: content,
    subject: matter,
  };
  try{
    await transport
      .sendMail(opciones)
      .then((result) => {
        logger.info(result);
      })
  } catch {
    logger.error(`No pudo ser envíado el correo`)
  }
};

