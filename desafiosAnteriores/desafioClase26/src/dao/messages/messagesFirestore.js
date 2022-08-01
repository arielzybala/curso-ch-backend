const dtoFirestore = require("../../dto/dtoFirestore");

module.exports = class MessagesDaoFirestore extends dtoFirestore {
  constructor() {
    super("messages");
  }
};