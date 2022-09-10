const dtoMongo = require("../../dto/dtoMongo");

module.exports = class UsersDaoMongo extends dtoMongo {
  constructor() {
    super("users");
  }

  async listByEmail(email) {
    try {
      const docs = await this.coleccion.findOne({ email });
      if (docs) {
        return docs;
      } else {
        return;
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
};
