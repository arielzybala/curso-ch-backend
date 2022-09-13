const { messagesDao } = require("../../dao");

const chatSocketController = (io) => {
  io.on("connection", async (socket) => {
    let reload = await messagesDao.listAll();
    socket.emit("server:renderMessages", reload);

    socket.on("user:saveMessage", async (message) => {
      await messagesDao.save(message);

      let load = await messagesDao.listAll().then((data) => data);

      io.sockets.emit("server:renderMessages", load);
    });
  });
};

module.exports = chatSocketController;
