const dtoMongo = require("../../dto/dtoMongo");

module.exports = class OrdersDaoMongo extends dtoMongo {
  constructor() {
    super("orders", {
      userId:{
        type: String,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      address: {
        type: String,
      },
      orderNumber:{
        type: Number,
      },
      items: {
        type: [],
        required: true,
      },
      state: {
        type: String,
        required: true,
      }
    });
  }
};
