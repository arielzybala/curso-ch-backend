const mongoAtlas = {
  uri: process.env.MONGOURI,
  advancedOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
  },
  secret: process.env.MONGOSECRET,
};

const mongoDB = {
  urlToDataBase: process.env.MONGOURI,
  options: {
      keepAlive: true,
      autoIndex: false,
      maxPoolSize: 1000,
      useNewUrlParser: true,
      useUnifiedTopology:true,
  }
}
const firebaseURL = process.env.FBURL;
const firebaseDB = {
  "type": process.env.FDBT,
  "project_id": process.env.FDBPI,
  "private_key_id": process.env.FDBPKI,
  "private_key": process.env.FDBPK,
  "client_email": process.env.FDBCE,
  "client_id": process.env.FDBCI,
  "auth_uri": process.env.FDBAU,
  "token_uri": process.env.FDBTU,
  "auth_provider_x509_cert_url": process.env.FDBAP509CU,
  "client_x509_cert_url": process.env.FDBC509CU
};


const fileSystemDB = {
  path: process.env.FSFOLDER
}

module.exports = {
  mongoAtlas, mongoDB, firebaseDB, firebaseURL, fileSystemDB
};