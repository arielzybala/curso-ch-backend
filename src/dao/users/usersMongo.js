const dtoMongo = require("../../dto/dtoMongo");
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

module.exports = class UsersDaoMongo extends dtoMongo {
  constructor() {
    super("users", {
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
};
