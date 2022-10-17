const deleteBtn = document.getElementsByClassName('eraseCart');


deleteBtn[0].addEventListener("click", deleteCartEvent)

function deleteCartEvent (e) {
  e.preventDefault();
  let nodeBtn = e.target.id;

 const options = {
   method: "DELETE",
  };
  fetch(`${e.view.window.origin}/api/cart/${nodeBtn}`, options).then(() => {
    window.location.reload();
})
}
