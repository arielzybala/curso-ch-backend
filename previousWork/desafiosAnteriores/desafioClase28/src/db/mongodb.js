const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const { mongooseModel } = require("../config");

const uri = mongooseModel.uri;

const connect = async () => {
  mongoose.createConnection(uri, mongooseModel.options);
  const db = mongoose.connections[0];
  db.on("error", () => {
    console.log("No se conectó a la base de datos");
  });
  db.once("open", () => {
    //console.log("Conectada a la base de datos");
  });
};
module.exports = { connect };
