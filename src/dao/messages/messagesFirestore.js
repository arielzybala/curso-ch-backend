const dtoFirestore = require("../../dto/dtoFirestoreMessage");

module.exports = class MessagesDaoFirestore extends dtoFirestore {
  constructor() {
    super("messages");
  }
};