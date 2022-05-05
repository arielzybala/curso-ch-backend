// INVENTARIO DE PRODUCTOS
const formProducts = document.querySelector("#formProducts");
const nameProd = document.querySelector("#nameProd");
const brandProd = document.querySelector("#brandProd");
const priceProd = document.querySelector("#priceProd");
const imgProd = document.querySelector("#imgProd");

formProducts.addEventListener("submit", (e) => {
  e.preventDefault();
  saveProduct(
    nameProd.value,
    brandProd.value,
    priceProd.value,
    imgProd.value,
    uuid()
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
        formatDate()
      )
    : alert("error al redactar el correo");
});
