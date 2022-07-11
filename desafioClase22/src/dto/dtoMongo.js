const mongoose = require("mongoose");
const { mongoDB } = require("../config");
const { asPOJO, removeField, renameField } = require("../utils/implements");

const URI = `${mongoDB.urlToDataBase}`;
mongoose.connect(URI, mongoDB.options);

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
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async addNewMessage(newDocument) {
    try {
      let doc = await this.coleccion.create(newDocument);
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }
}
module.exports = dtoMongo;
