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
        result.push({ id: doc.id, ...doc.data() });
      });
      return result[0];
    }
  }
};
