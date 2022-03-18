//let a = [1, 2, 3];
//console.log(a.length);
let lista = [];
function mostrarLista (lista) {
    if (lista.length === 0){
        console.log("lista vacía");
    } else {
        console.log(lista);
    }
}
mostrarLista(lista);

let lista2 = ["manzana", "naranja", "frutilla"];
const mostrarLista2 = (lista2) =>{ lista2.length === 0 ? console.log("lista vacía") :  console.log(lista2)}

mostrarLista2(lista2);