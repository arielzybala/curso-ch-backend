const NODE_ENV = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `.env.${NODE_ENV}` }); //Esto es por si hay que usar un .env.production, en algún momento
const express = require("express");
const session = require("express-session");
const path = require("path");
const cp = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const override = require("method-override");
const mongoStore = require("connect-mongo");
const http = require("http");
const cluster = require("cluster");
const compression = require("compression");
const { cpus } = require("os");
const { Server } = require("socket.io");
const yargs = require("yargs/yargs")(process.argv.slice(2));
const args = yargs.alias({ p: "PORT" }).argv;
const PORT = args.PORT || process.env.PORT || 8080; //Quedo modificado así por Heroku
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const numCPUS = cpus().length;
const { mongoAtlas } = require("./config");
const routerMain = require("./routes/mainRoutes");
const routerUser = require("./routes/userRoutes");
const routerCart = require("./routes/cartRoutes");
const routerOrders = require("./routes/ordersRoutes");
const routerProducts = require("./routes/productsRoutes");
const passport = require("./routes/middleware/passport");
const { logger } = require("./utils/logger");

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(morgan("combined"));
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));
app.use(cp());

/**
   * 
app.use(
  session({
    secret: "valorSecreto",
    resave: true,
    saveUninitialized: true,
  })
  );
  */
  
   app.use(
     session({
       store: mongoStore.create({
         mongoUrl: mongoAtlas.uri,
         mongoOptions: mongoAtlas.advancedOptions,
         ttl: 60,
         retries: 0,
         touchAfter: 24 * 3600, //con esto la sesión dura 24hs
        }),
        secret: mongoAtlas.secret,
        resave: true,
        saveUninitialized: true,
        rolling: true,
      })
      );
app.use(override("_method"));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", routerMain, routerUser);
app.use("/api/cart", routerCart);
app.use("/api/products", routerProducts);
app.use("/api/orders", routerOrders);

require("./controllers/sockets/chatControllers")(io);

if (process.env.SERVERMODE == "FORK") {
  server.listen(PORT, (err) => {
    !err
      ? logger.info(
          `Server iniciado en modo:[${process.env.SERVERMODE}] con id de Proceso [${process.pid}] en puerto [${PORT}]`
        )
      : logger.error(`Server no funciona por error:[${err}`);
  });
} else {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUS; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      logger.info(`worker con id de proceso ${worker.process.pid} eliminado`);
    });
  } else if (process.env.SERVERMODE == "CLUSTER") {
    server.listen(PORT, (err) => {
      !err
        ? logger.info(
            `Server iniciado en modo:[${process.env.SERVERMODE}] con id de Proceso [${process.pid}] en puerto [${PORT}]`
          )
        : logger.error(`Server no funciona por error:[${err}`);
    });
  }
}

module.exports = app;
