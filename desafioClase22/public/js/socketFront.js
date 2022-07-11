const socket = io();

socket.on("server:renderMessages", (data) => {
  loadMessages(data);
});

const saveMessage = (emailChat, nameChat, lastNameChat, yearsOldChat, nickNameChat, urlAvatarChat, messageChat, timeChat) => {
  socket.emit("user:saveMessage", {
    author: {
      emailChat,
      nameChat,
      lastNameChat,
      yearsOldChat,
      nickNameChat,
      urlAvatarChat,
    },
    text: messageChat,
    time: timeChat,
  });
};
