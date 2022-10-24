const socket = io();
console.log(socket)

socket.on("server:renderMessages", (data) => {
  console.log(socket)
  loadMessages(data);
});

const saveMessage = (messageChat, timeChat) => {
  socket.emit("user:saveMessage", {
    text: messageChat,
    time: timeChat,
  });
};
