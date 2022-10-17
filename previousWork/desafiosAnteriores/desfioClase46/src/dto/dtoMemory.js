module.exports = class ContenedorMemoria {
  constructor() {
    this.element = [];
  }

  listById(id) {
    const document = this.element.find((e) => e.id == id);
    if (!document) {
      throw new Error(`Error al listar: elemento no encontrado`);
    } else {
      return document;
    }
  }

  listAll() {
    return [...this.element];
  }

  save(newDocument) {
    let newId;
    if (this.element.length == 0) {
      newId = 1;
    } else {
      newId = this.element[this.element.length - 1].id + 1;
    }

    const document = { ...newDocument, id: newId };
    this.element.push(document);
    return document;
  }

  update(document) {
    const index = this.element.findIndex((e) => e.id == document.id);
    if (index == -1) {
      throw new Error(`Error al actualizar: elemento no encontrado`);
    } else {
      this.element[index] = document;
      return document;
    }
  }

  deleteById(id) {
    const index = this.element.findIndex((e) => e.id == id);
    if (index == -1) {
      throw new Error(`Error al borrar: elemento no encontrado`);
    } else {
      return this.element.splice(index, 1);
    }
  }

  deleteAll() {
    this.element = [];
  }
};
