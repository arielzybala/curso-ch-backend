const socket = io();

socket.on("server:renderProducts", (data) => {
  loadAllRows(data);
});

const saveProduct = (nameProd, brandProd, priceProd, imgProd, id) => {
  socket.emit("user:saveProduct", {
    nameProd,
    brandProd,
    priceProd,
    imgProd,
    idProd: id,
  });
};

socket.on("server:renderMessages", (data) => {
  loadListItems(data);
});

const saveMessage = (nameChat, emailChat, messageChat, time) => {
  socket.emit("user:saveMessage", {
    nameChat,
    emailChat,
    messageChat,
    timeChat: time,
  });
};
