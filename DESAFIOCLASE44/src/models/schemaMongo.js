const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/graphql";
mongoose.connect(url);

const db = mongoose.connection;
db.on("open", () => {
  console.log("¡Conectado a MongoDB!");
});
db.on("error", () => {
  console.log("¡Error al conectar a MongoDB!");
});

module.exports = db;
