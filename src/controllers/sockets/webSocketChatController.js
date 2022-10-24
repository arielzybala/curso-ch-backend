const { ChatService } = require("../../services/chatServices");
const service = new ChatService();

const chatSocketController = (io) => {
  io.on("connection", async (socket) => {
    
    let reloadMsg = await service.listAllMessages();
    
    socket.emit("server:renderMessages", reloadMsg);

    socket.on("user:saveMessage", async (message) => {
      //Tomo los datos de la cookie, para que el usuario solo tenga que agregar comentario.
      let load = await service.saveMessage(socket.handshake.headers.cookie, message);

      io.sockets.emit("server:renderMessages", load);
    });
  });
};

module.exports = chatSocketController;