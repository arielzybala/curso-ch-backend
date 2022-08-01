const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

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
    }),
    secret: mongoAtlas.secret,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 10 * 60000,
    }
  })
);

app.use(passport.initialize())
app.use(passport.session())



app.use("/api", routerMain , routerUser);

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
server.listen(PORT, (err) => {
  !err
    ? console.log("Server RUN ON PORT: ", PORT)
    : console.log("Server NOT RUN");
});
