const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
const router = require("./routes/main.js");
const porcentage = require('./normalizr/normalizrTest')
const { Server } = require("socket.io");
const { messagesDao } = require("./dao/index.js");
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

app.use("/api", router);


io.on("connection", async (socket) => {

  let reload = await messagesDao.findAllMessage();
  let normalizeData = porcentage(reload)
  socket.emit("server:renderMessages", reload , normalizeData);



  socket.on("user:saveMessage", async (message) => {

    let add = await messagesDao.addNewMessage(message);

    let load = await messagesDao.findAllMessage().then((data) => data);
    let normalizeData = porcentage(load)

    io.sockets.emit("server:renderMessages", load , normalizeData);

  });

});
server.listen(PORT, (err) => {
  !err
    ? console.log("Server RUN ON PORT: ", PORT)
    : console.log("Server NOT RUN");
});
