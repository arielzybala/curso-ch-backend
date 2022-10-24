const socket = io(window.location.href, {transports: ['websocket']});

socket.on("server:renderMessages", (data) => {
  loadMessages(data);
});

const saveMessage = (messageChat, timeChat) => {
  socket.emit("user:saveMessage", {
    text: messageChat,
    time: timeChat,
  });
};
