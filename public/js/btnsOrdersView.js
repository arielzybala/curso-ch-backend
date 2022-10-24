const deleteBtn = document.getElementsByClassName("eraseOrder");

for (let button of deleteBtn) {
  button.addEventListener("click", deleteOrderEvent);
}

function deleteOrderEvent(e) {
  e.preventDefault();
  let nodeBtn = e.target.id;

  fetch(`${e.view.window.origin}/api/orders/${nodeBtn}`, {
    method: "DELETE",
    redirect: "follow",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error! status: ${res.status}`);
      }
      alert("Orden Eliminada")
      return window.location.reload();
    })
    .catch((err) => {
      console.log(err)
      return window.location.reload();
    });
}

const updateBtn = document.getElementsByClassName("updateOrder");

for (let button of updateBtn) {
  button.addEventListener("click", updateOrderRef);
}

function updateOrderRef(e) {
  e.preventDefault();
  e.stopPropagation();
  let nodeId = e.target.id;
  window.location.href = `${e.view.window.origin}/api/orders/update/${nodeId}/`;
}
