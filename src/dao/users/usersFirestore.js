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

  async listByEmail(email) {
    let result = [];
    const newDoc = await this.collectionDB.where("email", "==", email).get();
    if (newDoc.empty) {
      return false;
    } else {
      newDoc.forEach((doc) => {
        result.push(doc.data());
      });
      return result;
    }
  }
};
