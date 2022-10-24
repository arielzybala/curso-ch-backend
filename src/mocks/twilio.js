const client = require("twilio")(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

const { logger } = require("../utils/logger");

const sendMessage = async (receptor, dataFromCart) => {
  const phoneUser = `whatsapp:${receptor}`;
  const orderToBy = `${JSON.stringify(dataFromCart)}`;
  try {
    client.messages
      .create({
        body: orderToBy,
        from: "whatsapp:+14155238886",
        to: phoneUser,
      })
      .then((message) => logger.info(message.sid))
      .done();
  } catch {
    (error) => logger.info(`No pudo enviar el mensaje ${error}`);
  }
};

/*Como solicitarlo en el código*/
    //mensaje de whapps
    // const phone = (user.codesCountry + user.phone).toString();
    // await sendMessage(phone, listOfOrder);


module.exports = sendMessage;