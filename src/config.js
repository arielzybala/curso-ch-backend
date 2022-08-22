const mongoAtlas = {
  uri: process.env.MONGOURI,
  advancedOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
  },
  secret: process.env.MONGOSECRET,
};

module.exports = {
  mongoAtlas
};