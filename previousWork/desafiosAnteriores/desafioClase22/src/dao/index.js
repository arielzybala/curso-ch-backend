const PERSISTENCE = process.env.PERSISTENCE || "";
let messagesDao;

switch (PERSISTENCE) {
  case "mongo":
    const MessagesDaoMongo = require("./messages/messagesMongo");
    messagesDao = new MessagesDaoMongo();
    break;
  case "firebase":
    const MessagesDaoFirestore = require("./messages/messagesFirestore");
    messagesDao = new MessagesDaoFirestore();
    break;
  default:
    const MessagesDaoFs = require("./messages/messagesFs");
    messagesDao = new MessagesDaoFs();
    break;
}

module.exports = { messagesDao };
