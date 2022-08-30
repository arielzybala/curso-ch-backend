let cardProduct = document.querySelectorAll(".cardProduct");

for(let button of cardProduct){
    button.addEventListener("click" , productShowDetail)
}

function productShowDetail(e){
    e.preventDefault()
    let nodeButton = e.target;
    if(nodeButton.id){
        window.location.href = `${e.path[8].origin}/api/products/${nodeButton.id}`;
    }
}