const mongoose = require("mongoose");
const { mongoDB } = require("../config");
const { asPOJO, removeField, renameField } = require("../js/tools/utils");

const URI = `${mongoDB.urlToDataBase}`;
mongoose.connect(URI, mongoDB.options);

class dtoMongo {
  constructor(collectionName, schemaModel) {
    this.coleccion = mongoose.model(collectionName, schemaModel);
  }

  async listById(id) {
    try {
      const docs = await this.coleccion.find({ _id: id }, { __v: 0 });
      if (docs.length == 0) {
        throw new Error("No fue encontrado el ID");
      } else {
        const result = renameField(asPOJO(docs[0]), "_id", "id");
        return result;
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async listAll() {
    try {
      let docs = await this.coleccion.find({}, { __v: 0 }).lean();
      docs = docs.map(asPOJO);
      docs = docs.map((d) => renameField(d, "_id", "id"));
      return docs;
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async save(newDocument) {
    try {
      let doc = await this.coleccion.create(newDocument);
      doc = asPOJO(doc);
      renameField(doc, "_id", "id");
      removeField(doc, "__v");
      return doc;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async update(newDocument) {
    try {
      renameField(newDocument, "id", "_id");
      const { n, nModified } = await this.coleccion.replaceOne(
        { _id: newDocument._id },
        newDocument
      );
      if (n == 0 || nModified == 0) {
        throw new Error("Error al actualizar: no encontrado");
      } else {
        renameField(newDocument, "_id", "id");
        removeField(newDocument, "__v");
        return asPOJO(newDocument);
      }
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const { n, nDeleted } = await this.coleccion.deleteOne({ _id: id });
      if (n == 0 || nDeleted == 0) {
        throw new Error("Error al borrar: no encontrado");
      }
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll() {
    try {
      await this.coleccion.deleteMany({});
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }
}
module.exports = dtoMongo;
