const dtoFs = require("../../dto/dtoFs");
module.exports = class ProductsDaoFs extends dtoFs {
    constructor() {
        super('products.json')
    }
};