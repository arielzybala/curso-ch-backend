const btnOrder = document.getElementsByClassName("orderToBuy");

btnOrder[0].addEventListener("click", createOrder)

function createOrder (e) {
    e.preventDefault()
    e.stopPropagation()
    let data = {idProduct: e.target.id}
    console.log(data)
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
    
      alert("Ha realizado la compra")
    return fetch(`/api/cart/${e.target.id}/sendOrder`, options);
}
