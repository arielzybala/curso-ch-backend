const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const { mongooseModel } = require("../config");
const { logger } = require("../utils/logger");

const uri = mongooseModel.uri;

const connect = async () => {
  mongoose.createConnection(uri, mongooseModel.options);
  const db = mongoose.connections[0];
  db.on("error", () => {
    logger.error("No se pudo conectar a la base de datos de los Usuarios");
  });
  db.once("open", () => {
    logger.info("Conectado a la base de datos de los Usuarios")
  });
};
module.exports = { connect };
