let cardProduct = document.querySelectorAll(".cardProduct");

for (let button of cardProduct) {
  button.addEventListener("click", addCartShop);
}

function addCartShop(e) {
  e.preventDefault();
  let nodeButton = e.target;
  let nodeCard = nodeButton.parentNode.parentNode;
  let title = nodeCard.querySelector("#titleProduct").textContent.toString();
  let price = parseInt(nodeCard.querySelector("#priceProduct").textContent);
  let thumbnail = nodeCard.parentNode.querySelector("#thumbnailProduct").src;

  if (nodeButton.id) {
    const data = {
      product: {
        id: nodeButton.id,
        title: title,
        price: price,
        thumbnail: thumbnail,
      },
      creation: new Date().toLocaleTimeString(),
    };
    console.log(data);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    return fetch(
      `${e.view.window.origin}/api/cart/prod/test`,
      options
    );
  } else if (e.path[0].href) {
    window.location.href = `${e.path[0].href}`;
  }
}
