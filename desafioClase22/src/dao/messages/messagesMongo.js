const dtoMongo = require("../../dto/dtoMongo");

module.exports = class MessagesDao extends dtoMongo {

    constructor() {
        super('Messages', {
            author: {
                email: { type: String, required: true },
                name: { type: Number, required: true },
                lastName: { type: String, required: true },
                yearsOld: { type: Number, required: true },
                nickName: { type: String, required: true },
                urlAvatar: { type: String, required: true },
            },
            text: { type: String, required: true },
            time: { type: String, required: true },
        })
    }
}
