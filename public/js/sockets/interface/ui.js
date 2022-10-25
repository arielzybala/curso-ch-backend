const boxMsg = document.querySelector("#boxMsg");

const loadMessages = (data) => {
 
    let htmlMsg = data.map((m) => {
        return `
          <ul class="container__ul wrap">
          <li class="container__li container__li--email">
              ${m[2].email}
          </li>
          <li class="container__li container__li--time">
              ${new Date(m[1].time).toLocaleString('es-ES')}
          </li>
          <li class="container__li container__li--message">
              ${m[0].text}
          </li>
          <li class="container__li container__li--message">
          <img class="container__img" alt="Imagen previa de Productos" src='./uploads/${m[4].avatar}'>
          </li>
          <li class="container__li wrap center">
           VER SÓLO SUS <button class="container__tableBtnUpdate"><a href="/chatUser/${m[2].email}">MENSAJES</a></button>
          </li>
      </li>
      </ul>
          `;
      })
      .join(" ");

      boxMsg.innerHTML = htmlMsg;
  }
