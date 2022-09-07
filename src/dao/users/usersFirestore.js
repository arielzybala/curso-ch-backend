const dtoFirestore = require("../../dto/dtoFirestore");
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

module.exports = class UsersDaoFirestore extends dtoFirestore {
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
