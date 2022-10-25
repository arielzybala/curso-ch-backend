const formChat = document.querySelector("#formChat");
const messageChat = document.querySelector("#messageChat");
let timeChat = "";

formChat.addEventListener("submit", (e) => {
  e.preventDefault();
  saveMessage(messageChat.value, (timeChat = new Date()));
});
