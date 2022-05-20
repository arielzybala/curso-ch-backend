// INVENTARIO DE PRODUCTOS
const formProducts = document.querySelector("#formProducts");
const name = document.querySelector("#name");
const brand = document.querySelector("#brand");
const price = document.querySelector("#price");
const image = document.querySelector("#image");

formProducts.addEventListener("submit", (e) => {
  e.preventDefault();
  saveProduct(
    name.value,
    brand.value,
    price.value,
    image.value
  );
});

// CAJA DE MENSAJES

const formChat = document.querySelector("#formChat");
const nameChat = document.querySelector("#nameChat");
const emailChat = document.querySelector("#emailChat");
const messageChat = document.querySelector("#messageChat");

formChat.addEventListener("submit", (e) => {
  e.preventDefault();
  validEmail(emailChat.value)
    ? saveMessage(
        nameChat.value,
        emailChat.value,
        messageChat.value,
      )
    : alert("error al redactar el correo");
});
