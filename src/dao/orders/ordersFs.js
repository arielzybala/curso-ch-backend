const dtoFs = require("../../dto/dtoFs");

module.exports = class OrdersDaoFs extends dtoFs {
  constructor() {
    super("orders.json");
  }
};
