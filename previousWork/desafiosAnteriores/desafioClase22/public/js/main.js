const formChat = document.querySelector("#formChat");
const emailChat = document.querySelector("#emailChat");
const nameChat = document.querySelector("#nameChat");
const lastNameChat = document.querySelector("#lastNameChat");
const yearsOldChat = document.querySelector("#yearsOldChat");
const nickNameChat = document.querySelector("#nickNameChat");
const urlAvatarChat = document.querySelector("#urlAvatarChat");
const messageChat = document.querySelector("#messageChat");
let timeChat = "";

formChat.addEventListener("submit", (e) => {
  e.preventDefault();
  validEmail(emailChat.value)
    ? saveMessage(
      emailChat.value,
      nameChat.value,
      lastNameChat.value,
      yearsOldChat.value,
      nickNameChat.value,
      urlAvatarChat.value,
      messageChat.value,
      timeChat = formatDate()
      )
    : alert("error al redactar el correo");
});
