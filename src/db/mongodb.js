const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const { mongooseModel } = require("../config");
const { logger } = require("../utils/logger");

const uri = mongooseModel.uri;

const connect = async () => {
  mongoose.createConnection(uri, mongooseModel.options);
  const db = mongoose.connections[0];
  db.on("error", () => {
    logger.error("Error sin acceso a la DB chat");
  });
  db.once("open", () => {
    logger.info("Conectado al chat")
  });
};
module.exports = { connect };
