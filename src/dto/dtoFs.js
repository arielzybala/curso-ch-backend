const fs = require("fs/promises");
const { fileSystemDB } = require("../config");

module.exports = class dtoFs {
  constructor(routeStorage) {
    this.fileStorage = `${fileSystemDB.path}${routeStorage}`;
  }

  async listById(id) {
    const objs = await this.listAll();
    const result = objs.find((e) => e.id == id);
    return result;
  }

  async listAll() {
    try {
      const objs = await fs.readFile(this.fileStorage, "utf-8");
      return JSON.parse(objs);
    } catch (error) {
      return [];
    }
  }

  async save(obj) {
    const objs = await this.listAll();

    let newId;
    if (objs.length == 0) {
      newId = 1;
    } else {
      newId = objs[objs.length - 1].id + 1;
    }

    const newObj = { ...obj, id: newId };
    objs.push(newObj);
    console.log()

    try {
      await fs.writeFile(this.fileStorage, JSON.stringify(objs, null, 2));
      return newObj;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async update(elem) {
    const objs = await this.listAll();
    const index = objs.findIndex((o) => o.id == elem.id);
    if (index == -1) {
      throw new Error(`Error al actualizar: no se encontró el id ${id}`);
    } else {
      objs[index] = elem;
      try {
        await fs.writeFile(this.fileStorage, JSON.stringify(objs, null, 2));
      } catch (error) {
        throw new Error(`Error al actualizar: ${error}`);
      }
    }
  }

  async deleteById(id) {
    const objs = await this.listAll();
    const index = objs.findIndex((e) => e.id == id);
    if (index == -1) {
      throw new Error(`Error al borrar: no se encontró el id ${id}`);
    }

    objs.splice(index, 1);
    try {
      await fs.writeFile(this.fileStorage, JSON.stringify(objs, null, 2));
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.fileStorage, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error(`Error al borrar todo: ${error}`);
    }
  }
};
