const tableProducts = document.querySelector("#tbody_product");

const loadAllRows = (data) => {
  let htmlProd = data
    .map((p) => {
      return `
        <tr class="container__tableRow">
        <td class="container__tableData" data-label="Nombre:">
            ${p.name}
        </td>
        <td class="container__tableData" data-label="Marca:">
            ${p.brand}
        </td>
        <td class="container__tableData" data-label="Precio:">
            <p>$ ${p.price}</p>
        </td>
        <td class="container__tableData container__tableData-lastData" data-label="Vista Previa:">
            <img class="container__img" alt="Imagen previa de Productos" src="${p.image}"
        </td>
      </tr>
        `;
    })
    .join(" ");

  tableProducts.innerHTML = htmlProd;
};

const boxMsg = document.querySelector("#boxMsg");

const loadMessages = (data) => {
  let htmlMsg = data
    .map((m) => {
      return `
        <ul class="container__ul">
        <li class="container__li container__li--email">
            ${m.email}
        </li>
        <li class="container__li container__li--time">
            ${m.created_at}
        </li>
        <li class="container__li container__li--message">
            ${m.message}
        </li>
    </ul>
        `;
    })
    .join(" ");

  boxMsg.innerHTML = htmlMsg;
};
