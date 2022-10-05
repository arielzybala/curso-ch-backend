const dtoFirestore = require("../../dto/dtoFirestore");

module.exports = class UsersDaoFirestore extends dtoFirestore {
  constructor() {
    super("users");
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
