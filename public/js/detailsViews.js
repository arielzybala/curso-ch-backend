const btnAdd = document.getElementsByClassName("add");
const amountAdd = document.getElementById("amount");

btnAdd[0].addEventListener("click", addProduct);

function addProduct(e) {
  e.preventDefault();
  e.stopPropagation();

  const check = document.cookie.toString();

  if (check.includes("jwt")) {
    let amount = amountAdd.value;

    if (amount <= 0) {
      return alert("Debe agregar una cantidad válida");
    }

    let data = { quantity: amount };

    fetch(`${e.view.window.origin}/api/cart/${e.target.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      accept: "application/json",
      body: JSON.stringify(data),
    });
    alert("Producto Agregado");
    return window.location.reload();
  } else {
    alert("Debe tener una sesión abierta");
    location.href = "/login";
  }
}
