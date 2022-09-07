const admin = require("firebase-admin")
const { firebaseDB, firebaseURL } = require("../config");

admin.initializeApp({
  credential: admin.credential.cert(firebaseDB),
  databaseURL: firebaseURL
});

const db = admin.firestore();

class dtoFirestore {
  constructor(nameCollection) {
    this.collectionDB = db.collection(nameCollection);
  }

  async listById(id) {
    try {
      const doc = await this.collectionDB.doc(id).get();
      if (!doc.exists) {
        throw new Error(`Error al listar por id: no se encontró`);
      } else {
        const data = doc.data();
        return { ...data, id };
      }
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`);
    }
  }

    async listByEmail(email) {
    try {
      const doc = await this.collectionDB.doc(email).get();
      if (!doc.exists) {
        return;
      } else{
        const data = doc.data();
        return { ...data, email };
      }
    } catch (error) {
      throw new Error(`Error al listar por email: ${error}`);
    }
  }

  async listAll() {
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

  async save(newDocument) {
    try {
      const saved = await this.collectionDB.add(newDocument);
      return { ...newDocument, id: saved.id };
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async update(newDocument) {
    try {
      const updated = await this.collectionDB
        .doc(newDocument.id)
        .set(newDocument);
      return updated;
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  } 

  async deleteById(id) {
    try {
      const item = await this.collectionDB.doc(id).delete();
      return item;
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll() {
    try {
      const docs = await this.listAll();
      const ids = docs.map((d) => d.id);
      const duty = ids.map((id) => this.deleteById(id));
      const results = await Promise.allSettled(duty);
      const errors = results.filter((r) => r.status == "rejected");
      if (errors.length > 0) {
        throw new Error("no se borró todo. volver a intentarlo");
      }
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async desconectar() {}
}

module.exports = dtoFirestore;
