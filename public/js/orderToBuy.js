const btnOrder = document.getElementsByClassName("orderToBuy");

btnOrder[0].addEventListener("click", createOrder);

async function createOrder(e) {
  e.preventDefault();
  e.stopPropagation();
  const check = document.cookie.toString();
  if (!check.includes("jwt")) {
    alert("Debe tener una sesión iniciada");
    return location.href = `${e.view.window.origin}/login`;
  }
  return await fetch(`${e.view.window.origin}/api/orders`, {
    method: "POST",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error! status: ${res.status}`)
      }
      alert("Orden Enviada");
      return location.href = `${e.view.window.origin}/api/products`;
    })
    .catch((error) => {
      alert("Orden Enviada");
      console.log(error);
    });
}
