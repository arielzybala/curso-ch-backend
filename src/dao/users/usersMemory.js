const dtoMemory = require("../../dto/dtoMemory");

module.exports = class UsersDaoMemory extends dtoMemory {
  constructor() {
    super("users");
  }

  listByEmail(email) {
    const document = this.element.find((e) => e.email == email);
    if (document) {
      return document;
    } else {
      return;
    }
  }
};
