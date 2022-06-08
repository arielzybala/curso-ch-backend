module.exports = {
  fileSystem: {
    path: "./db",
  },
  mongodb: {
    cnxStr: "mongodb://localhost/ecommerce",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
  firebase: {},
};
