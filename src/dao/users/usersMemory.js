const dtoMemory = require("../../dto/dtoMemory");
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

module.exports = class UsersDaoMemory extends dtoMemory {
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
