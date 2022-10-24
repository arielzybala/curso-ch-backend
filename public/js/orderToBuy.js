const btnOrder = document.getElementsByClassName("orderToBuy");

btnOrder[0].addEventListener("click", createOrder);

function createOrder(e) {
  e.preventDefault();
  e.stopPropagation();

  const check = document.cookie.toString();

  if (!check.includes("jwt")) {
    alert("Debe tener una sesión iniciada");
    return (location.href = `${e.view.window.origin}/login`);
  }

  fetch(`${e.view.window.origin}/api/orders`, {
    method: "POST",
  })
  alert("Orden Enviada");
  return (location.href = `${e.view.window.origin}/api/products`);
}

const deleteBtn = document.getElementsByClassName("eraseProduct");

for (let button of deleteBtn) {
  button.addEventListener("click", deleteProductEvent);
}

function deleteProductEvent(e) {
  e.preventDefault();
  e.stopPropagation();
  let nodeBtn = e.target.id;

  fetch(`${e.view.window.origin}/api/cart/delete/${nodeBtn}`, {
    method: "DELETE",
  })
  alert("El Producto ha sido eliminado");
  return window.location.reload();
}
