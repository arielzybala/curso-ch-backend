const client = require("twilio")(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

const { logger } = require("./logger");

const sendMessage = async (receptor, dataFromCart) => {
  const phoneUser = `whatsapp:${receptor}`;
  const orderToBy = `${JSON.stringify(dataFromCart)}`;

  client.messages
    .create({
      body: orderToBy,
      from: "whatsapp:+14155238886",
      to: phoneUser,
    })
    .then((message) => logger.info(message.sid))
    .done();
};

module.exports = sendMessage;
