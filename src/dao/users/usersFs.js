const dtoFs = require("../../dto/dtoFs");
const {
  email,
  password,
  nickname,
  age,
  address,
  codesCountry,
  phone,
  avatar,
  role,
} = require("../../utils/handleJoi");

module.exports = class ProductsDaoFs extends dtoFs {
  constructor() {
    super("users.json", {
      email,
      password,
      nickname,
      age,
      address,
      codesCountry,
      phone,
      avatar,
      role,
    });
  }

  async listByEmail(email) {
    const objs = await this.listAll();
    const result = objs.find((e) => e.email == email);
    return result;
  }
};
