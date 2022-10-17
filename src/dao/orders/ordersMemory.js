const dtoMemory = require("../../dto/dtoMemory");

module.exports = class OrdersDaoMemory extends dtoMemory {
  constructor() {
    super("orders");
  }

};
