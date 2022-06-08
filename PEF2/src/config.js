const mongoDB = {
    urlToDataBase: 'mongodb://localhost:27017/ecommerce',
    options: {
        keepAlive: true,
        autoIndex: false,
        maxPoolSize: 1000,
        useNewUrlParser: true,
        useUnifiedTopology:true,
    }
}








module.exports = {mongoDB}