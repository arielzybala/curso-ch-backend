const EV = process.env;

const mongoDBChat = {
  urlToDataBase: EV.MONGODB_URL,
  options: {
    keepAlive: EV.MONGO_OPTIONS_KA,
    autoIndex: EV.MONGO_OPTIONS_AI,
    maxPoolSize: EV.MONGO_OPTIONS_MPS,
    useNewUrlParser: EV.MONGO_OPTIONS_UNUP,
    useUnifiedTopology: EV.MONGO_OPTIONS_UUT,
  },
};

const mongoAtlas = {
  uri: EV.MONGOATLAS_URI,
  advancedOptions: {
    useNewUrlParser: EV.MONGO_OPTIONS_UNUP,
    useUnifiedTopology: EV.MONGO_OPTIONS_UUT,  
  },
  secret: EV.MONGOATLAS_SECRET,
};
const mongooseModel = {
  uri: EV.MONGOOSEMODEL_URI,
  options: {
    keepAlive: EV.MONGO_OPTIONS_KA,
    autoIndex: EV.MONGO_OPTIONS_AI,
    maxPoolSize: EV.MONGO_OPTIONS_MPS,
    useNewUrlParser: EV.MONGO_OPTIONS_UNUP,
    useUnifiedTopology: EV.MONGO_OPTIONS_UUT
  },
};

const firebaseURLChat = EV.FIREBASE_URL;
const firebaseDBChat = {
  "type": EV.FDB_T,
  "project_id": EV.FDB_PI,
  "private_key_id": EV.FDB_PKI,
  "private_key": EV.FDB_PK,
  "client_email": EV.FDB_CE,
  "client_id": EV.FDB_CI,
  "auth_uri": EV.FDB_AU,
  "token_uri": EV.FDB_TU,
  "auth_provider_x509_cert_url": EV.FDB_AP509CU,
  "client_x509_cert_url": EV.FDB_C509CU
};

const fileSystemDBChat = {path: EV.FSDB};

const mongoDB = {
  urlToDataBase: EV.CPMONGODB_URL,
  options: {
      keepAlive: EV.MONGO_OPTIONS_KA,
      autoIndex: EV.MONGO_OPTIONS_AI,
      maxPoolSize: EV.MONGO_OPTIONS_MPS,
      useNewUrlParser: EV.MONGO_OPTIONS_UNUP,
      useUnifiedTopology: EV.MONGO_OPTIONS_UUT
  }
}
const firebaseURL = EV.CPFIREBASE_URL;
const firebaseDB = {
  "type": EV.CPFDB_T,
  "project_id": EV.CPFDB_PI,
  "private_key_id": EV.CPFDB_PKI,
  "private_key": EV.CPFDB_PK,
  "client_email": EV.CPFDB_CE,
  "client_id": EV.CPFDB_CI,
  "auth_uri": EV.CPFDB_AU,
  "token_uri": EV.CPFDB_TU,
  "auth_provider_x509_cert_url": EV.CPFDB_AP509CU,
  "client_x509_cert_url": EV.CPFDB_C509CU
};

const fileSystemDB = {path: EV.FSDB}


module.exports = {
  mongoDBChat,
  firebaseURLChat,
  firebaseDBChat,
  fileSystemDBChat,
  mongoDB,
  firebaseDB,
  firebaseURL,
  fileSystemDB,
  mongoAtlas,
  mongooseModel,
};