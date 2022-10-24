const dtoMongo = require("../../dto/dtoMongo");

module.exports = class MessagesDao extends dtoMongo {
  constructor() {
    super("Messages", {
      author: {
        email: { type: String, required: true },
        nickname: { type: String, required: true },
        age: { type: Number, required: true },
        avatar: { type: String, required: true },
        idUser: { type: String, required: true },
        message: [
          {
            text: { type: String, required: true },
            time: { type: String, required: true },
          },
        ],
      },
    });
  }
};
