const admin = require("firebase-admin");
const { firebaseDBChat, firebaseURLChat } = require("../config");
const { logChat } = require("../utils/logger");

admin.initializeApp({
  credential: admin.credential.cert(firebaseDBChat),
  databaseURL: firebaseURLChat,
});

const db = admin.firestore();

class dtoFirestore {
  constructor(nameCollection) {
    this.collectionDB = db.collection(nameCollection);
  }

  async findAllMessage() {
    try {
      const result = [];
      const snapshot = await this.collectionDB.get();
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      return result;
    } catch (error) {
      logChat.error(`Error al intentar listar todos los mensajes: ${error}`)
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async addNewMessage(newDocument) {
    try {
      const saved = await this.collectionDB.add(newDocument);
      return { ...newDocument, id: saved.id };
    } catch (error) {
      logChat.error(`Error al intentar guardar el mensaje: ${error}`)
      throw new Error(`Error al guardar: ${error}`);
    }
  }
}
logger
module.exports = dtoFirestore;
