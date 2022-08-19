const dtoFs = require("../../dto/dtoFsMessage");
module.exports = class MessagesDaoFs extends dtoFs {
    constructor() {
        super('messages.json')
    }
};