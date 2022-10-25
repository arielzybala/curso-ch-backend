const url = (window.location.href).toString()
console.log(url)//así si estoy en local http://localhost:8080/chat 
//y si estoy en heroku devuelve https://secure-ridge-40503.herokuapp.com/chat
const socket = io(url, {transports: ['websocket']});
console.log(socket)
console.log(io)
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
