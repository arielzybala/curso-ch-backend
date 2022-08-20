const fs = require("fs/promises");
const { fileSystemDB } = require("../config");

module.exports = class dtoFs {
  constructor(routeStorage) {
    this.fileStorage = `${fileSystemDB.path}${routeStorage}`;
  }

  async findAllMessage() {
    try {
      const objs = await fs.readFile(this.fileStorage, "utf-8");
      return JSON.parse(objs);
    } catch (error) {
      return [];
    }
  }

  async addNewMessage(obj) {
    const objs = await this.findAllMessage();

    let newId;
    if (objs.length == 0) {
      newId = 1;
    } else {
      newId = objs[objs.length - 1].id + 1;
    }

    const newObj = { ...obj, id: newId };
    objs.push(newObj);

    try {
      await fs.writeFile(this.fileStorage, JSON.stringify(objs, null, 2));
      return newObj;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }
};
