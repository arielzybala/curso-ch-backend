const socket = io('https://secure-ridge-40503.herokuapp.com/chat', {transports: ['websocket']});

socket.on("server:renderMessages", (data) => {
  loadMessages(data);
});

const saveMessage = (messageChat, timeChat) => {
  socket.emit("user:saveMessage", {
    text: messageChat,
    time: timeChat,
  });
};
