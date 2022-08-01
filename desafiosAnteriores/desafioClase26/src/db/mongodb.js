const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const dbUrl = "mongodb://localhost:27017/usercoderagz";

const connect = async () => {
  mongoose.connect(dbUrl, {
    keepAlive: true,
    autoIndex: false,
    maxPoolSize: 1000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", () => {
    console.log("No se conectó a la base de datos");
  });
  db.once("open", () => {
    //console.log("Conectada a la base de datos");
  });
};
module.exports = { connect };
