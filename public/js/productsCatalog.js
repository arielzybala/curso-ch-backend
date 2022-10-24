const detailBtns = document.getElementsByClassName('cardProduct__btn');

for (let button of detailBtns) {
  button.addEventListener("click", detailviews);
}

function detailviews (e) {
  e.preventDefault()
  e.stopPropagation()
  window.location.href = `${e.view.window.origin}/api/products/${e.path[0].id}`
}