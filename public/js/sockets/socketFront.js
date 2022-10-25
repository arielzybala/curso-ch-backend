const socket = io();

socket.on("server:renderMessages", (data) => {
  loadMessages(data);
});

const saveMessage = (messageChat, timeChat) => {
  socket.emit("user:saveMessage", {
    cookie: document.cookie,
    text: messageChat,
    time: timeChat,
  });
};
