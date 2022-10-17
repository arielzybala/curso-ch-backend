const btnAdd = document.getElementsByClassName("add");
const amountAdd = document.getElementById("amount");

btnAdd[0].addEventListener("click", addProduct)

function addProduct (e) {
  const check = (document.cookie).toString()
  if(check.includes("jwt")){
    e.preventDefault()
    e.stopPropagation()
      let amount = amountAdd.value
      let data = {idProduct: e.target.id, quantity: amount}
  
      const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        };
      
  
      return fetch(`/api/cart/${e.target.id}/`, options);
    }
    alert("Debe tener una sesión abierta")
    location.href = '/login'
}
