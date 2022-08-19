const fs = require("fs/promises");
const { fileSystemDBChat } = require("../config");
const { logChat } = require("../utils/logger");

module.exports = class dtoFs {
  constructor(routeStorage) {
    this.fileStorage = `${fileSystemDBChat.path}${routeStorage}`;
  }

  async findAllMessage() {
    try {
      const objs = await fs.readFile(this.fileStorage, "utf-8");
      return JSON.parse(objs);
    } catch (error) {
      logChat.error(`Error al intentar listar todos los mensajes: ${error}`)
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
      logChat.error(`Error al intentar guardar el mensaje: ${error}`)
      throw new Error(`Error al guardar: ${error}`);
    }
  }
};
