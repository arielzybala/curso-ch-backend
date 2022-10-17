const dtoMongo = require("../../dto/dtoMongo");

module.exports = class ProductsDao extends dtoMongo {
  constructor() {
    super("products", {
      title: { type: String, required: true },
      text: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String, required: true },
      thumbnail: { type: String, required: true },
    });
  }
};
