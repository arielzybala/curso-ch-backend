const dtoMongo = require("../../dto/dtoMongo");

module.exports = class UsersDaoMongo extends dtoMongo {
  constructor() {
    super("users", {
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      nickname: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      codesCountry: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
    });
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
