const PERSISTENCE = process.env.PERSISTENCE || "firebase";
let MessagesDao;

switch (PERSISTENCE) {
  case "mongo":
    const MessagesDaoMongo = require("./messages/messagesMongo");
    MessagesDao = new MessagesDaoMongo();
    break;
  case "firebase":
    const MessagesDaoFirestore = require("./messages/messagesFirestore");
    MessagesDao = new MessagesDaoFirestore();
    break;
  default:
    const MessagesDaoFs = require("./messages/messagesFs");
    MessagesDao = new MessagesDaoFs();
    break;
}

module.exports = { MessagesDao };
