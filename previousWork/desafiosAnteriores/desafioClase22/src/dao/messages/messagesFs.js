const dtoFs = require("../../dto/dtoFs");
module.exports = class MessagesDaoFs extends dtoFs {
    constructor() {
        super('messages.json')
    }
};