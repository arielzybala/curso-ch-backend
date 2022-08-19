const dtoMongo = require("../../dto/dtoMongo");

module.exports = class ProductsDao extends dtoMongo {

    constructor() {
        super('products', {
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
        })
    }
}
