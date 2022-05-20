const socket = io();

socket.on("server:renderProducts", (data) => {
  loadAllRows(data);
});

const saveProduct = (name, brand, price, image) => {
  socket.emit("user:saveProduct", {
    name,
    brand,
    price,
    image,
  });
};
