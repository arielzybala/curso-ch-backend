const deleteBtn = document.getElementsByClassName("eraseProduct");

for (let button of deleteBtn) {
  button.addEventListener("click", deleteProductEvent);
}

function deleteProductEvent(e) {
  e.preventDefault();
  let nodeBtn = e.target.id;

  const options = {
    method: "DELETE",
  };
  fetch(`${e.view.window.origin}/api/products/${nodeBtn}`, options).then(() => {
    window.location.reload();
  });
}

const updateBtn = document.getElementsByClassName("updateProduct");

for (let button of updateBtn) {
  button.addEventListener("click", updateProductRef);
}

function updateProductRef(e) {
  e.preventDefault();
  e.stopPropagation();
  window.location.href = `${e.view.window.origin}/api/products/update/${e.path[0].id}`;
}
