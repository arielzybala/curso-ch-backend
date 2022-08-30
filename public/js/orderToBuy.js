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
    

    return fetch(`/api/cart/${e.target.id}/sendOrder`, options);
}
