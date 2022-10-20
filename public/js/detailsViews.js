const btnAdd = document.getElementsByClassName("add");
const amountAdd = document.getElementById("amount");

btnAdd[0].addEventListener("click", addProduct);

async function addProduct(e) {
  const check = document.cookie.toString();
  if (check.includes("jwt")) {
    e.preventDefault();
    e.stopPropagation();
    let amount = amountAdd.value;
    console.log(amount)
    if (amount <= 0){ return alert("Debe agregar una cantidad válida")}
    let data = { idProduct: e.target.id, quantity: amount };

    return await fetch(`${e.view.window.origin}/api/cart/${e.target.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      accept: 'application/json',
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error! status: ${res.status}`);
        }
        alert("Producto Agregado")

      })
      .catch((error) => {
        alert("Producto Agregado")
        console.log(error);
      });
  } else {
    alert("Debe tener una sesión abierta");
    location.href = "/login";
  }
}
