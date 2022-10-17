const dtoFirestore = require("../../dto/dtoFirestore");

module.exports = class OrdersDaoFirestore extends dtoFirestore {
  constructor() {
    super("orders");
  }
};
