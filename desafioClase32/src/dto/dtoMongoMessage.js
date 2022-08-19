const mongoose = require("mongoose");
const { mongoDBChat } = require("../config");
const { asPOJO, renameField } = require("../utils/implements");
const { logChat } = require("../utils/logger");


const URI = `${mongoDBChat.urlToDataBase}`;
mongoose.createConnection(URI, mongoDBChat.options);
const db = mongoose.connections[1];

class dtoMongo {
  constructor(collectionName, schemaModel) {
    this.coleccion = mongoose.model(collectionName, schemaModel);
  }

  async findAllMessage() {
    try {
      let docs = await this.coleccion.find({}, { __v: 0 }).lean();
      docs = docs.map(asPOJO);
      docs = docs.map((d) => renameField(d, "_id", "id"));
      return docs;
    } catch (error) {
      logChat.error(`Error al intentar listar todos los mensajes: ${error}`)
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async addNewMessage(newDocument) {
    try {
      let doc = await this.coleccion.create(newDocument);
    } catch (error) {
      logChat.error(`Error al intentar guardar el mensaje: ${error}`)
      throw new Error(`Error al guardar: ${error}`);
    }
  }
}
module.exports = dtoMongo;
