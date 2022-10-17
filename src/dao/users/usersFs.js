const dtoFs = require("../../dto/dtoFs");

module.exports = class UsersDaoFs extends dtoFs {
  constructor() {
    super("users.json");
  }

  async listByEmail(email) {
    const objs = await this.listAll();
    const result = objs.find((e) => e.email == email);
    return result;
  }
};
