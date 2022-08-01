const admin = require("firebase-admin");
const { firebaseDB, firebaseURL } = require("../config");

admin.initializeApp({
  credential: admin.credential.cert(firebaseDB),
  databaseURL: firebaseURL,
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
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async addNewMessage(newDocument) {
    try {
      const saved = await this.collectionDB.add(newDocument);
      return { ...newDocument, id: saved.id };
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }
}

module.exports = dtoFirestore;
