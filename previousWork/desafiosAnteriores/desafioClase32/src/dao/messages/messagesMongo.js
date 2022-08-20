const dtoMongo = require("../../dto/dtoMongoMessage");

module.exports = class MessagesDao extends dtoMongo {

    constructor() {
        super('Messages', {
            author: {
                emailChat: { type: String, required: true },
                nameChat: { type: String, required: true },
                lastNameChat: { type: String, required: true },
                yearsOldChat: { type: Number, required: true },
                nickNameChat: { type: String, required: true },
                urlAvatarChat: { type: String, required: true },
            },
            text: { type: String, required: true },
            time: { type: String, required: true },
        })
    }
}
