const NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({path: `.env.${NODE_ENV}`})
const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const routerUser = require("./routes/userRoutes");
const routerMain = require("./routes/mainRoutes");
const porcentage = require("./normalizr/normalizrTest");
const { Server } = require("socket.io");
const { MessagesDao } = require("./dao/index.js");
const io = new Server(server);
const cp = require("cookie-parser");
const session = require("express-session");
const db = require('./db/mongodb');
const passport = require('./routes/middleware/passport')
const { mongoAtlas } = require("./config");
const MongoStore = require("connect-mongo");
const cluster = require('cluster')
const {cpus} = require('os')
const numCPUS = cpus().length;
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const compression = require("compression");
const { logger } = require('./utils/logger');
const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs
.alias({p: 'PORT', m: 'MODO' }).default({ MODO:"FORK" }).argv 
const PORT = args.PORT;
const MODO = args.MODO;



app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.set('json spaces', 1) // para cuando haces un res.json se pueda leer fácil

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

db.connect();
app.use(cp());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoAtlas.uri,
      mongoOptions: mongoAtlas.advancedOptions,
      ttl: 60,
      retries: 0,
      touchAfter: 24 * 3600
    }),
    secret: mongoAtlas.secret,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 10 * 60000,
      httpOnly: true
    }
  })
);

app.use(passport.initialize())
app.use(passport.session())



app.use("/api", routerMain , routerUser);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

io.on("connection", async (socket) => {
  let reload = await MessagesDao.findAllMessage();
  let normalizeData = porcentage(reload);
  socket.emit("server:renderMessages", reload, normalizeData);

  socket.on("user:saveMessage", async (message) => {
    let add = await MessagesDao.addNewMessage(message);

    let load = await MessagesDao.findAllMessage().then((data) => data);
    let normalizeData = porcentage(load);

    io.sockets.emit("server:renderMessages", load, normalizeData);
  });
});

if(MODO == "FORK"){
  server.listen(PORT, (err) => {
    !err
      ? logger.info(`Server iniciado en modo:[${MODO}] con id de Proceso [${process.pid}] en puesto [${PORT}]`)
      : logger.error(`Server no funciona por error:[${err}`);
  });
} else {
  if(cluster.isMaster){
    for (let i = 0; i < numCPUS; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker,code,signal)=>{
        logger.info(`worker con id de proceso ${worker.process.pid} eliminado`)
        //para mantener una cantidad de cluster activos acá se puede poner un
        cluster.fork()
        // sino al eliminar el último cluster las request al sitio por parte del cliente no tendran un cpu que lo procese
    })
} else if( MODO == "CLUSTER") {
  server.listen(PORT, (err) => { 
    !err
      ? logger.info(`Server iniciado en modo:[${MODO}] con id de Proceso [${process.pid}] en puesto [${PORT}]`)
      : logger.error(`Server no funciona por error:[${err}`);
  });
    }}
