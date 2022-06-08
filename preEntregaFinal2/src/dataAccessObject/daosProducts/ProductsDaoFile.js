const DtoFile = require("../../dataTranferObject/DtoFile");

module.exports = class ProductsDaoFile extends DtoFile {
  constructor() {
    super("products.json");
  }
};
