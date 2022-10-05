const btnAdd = document.getElementsByClassName("add");
const amountAdd = document.getElementById("amount");

btnAdd[0].addEventListener("click", addProduct)

function addProduct (e) {
    e.preventDefault()
    e.stopPropagation()
    let amount = amountAdd.value
    let data = {idProduct: e.target.id, quantity: amount}

    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
    

    return fetch(`/api/cart/${e.target.id}/add`, options);
}
