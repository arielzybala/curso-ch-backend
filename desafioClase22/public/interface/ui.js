const boxMsg = document.querySelector("#boxMsg");

const loadMessages = (data) => {
    let htmlMsg = data.map((m) => {
        return `
          <ul class="container__ul">
          <li class="container__li container__li--email">
              ${m.author.emailChat}
          </li>
          <li class="container__li container__li--time">
              ${m.time}
          </li>
          <li class="container__li container__li--message">
              ${m.text}
          </li>
          <li class="container__li container__li--message">
          <img class="container__img" alt="Imagen previa de Productos" src='${m.author.urlAvatarChat}'>
      </li>
      </ul>
          `;
      })
      .join(" ");

      boxMsg.innerHTML = htmlMsg;
  }

