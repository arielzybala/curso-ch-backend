let miNumero = 2;

/**
 * @param Number
 * @return Number
 */
function sumarUno(args) {
  args = args + 1;
  console.log(args);
}

sumarUno(miNumero);

function pop() {
  sumarUno(1);
}

pop();

const persona = { nombre: "ariel" };
function reasignarObjeto(args) {
  args = 1000;
  /* esto se puede, porque se usa la constante previamente declarada para hace uso de ese espacio de memoria en este scoope,pero no pisa la dirección de memoria original, y fuera del scoope no tiene influencia
   */
  console.log(args);
}
reasignarObjeto(persona);

const personita = { nombre: "ariel" };
let personita2 = persona;
/*esta let tiene un valor alterable que hace referencia a la constante personita. Este valor puede cambiar*/

personita2 = 1000;
console.log(personita2);

//LO QUE NO SE PUEDE ES PISAR LA REFERENCIA DE UNA CONSTANTE. PORQUE ESE LUGAR DE MEMORIA ES ÚNICO NO ALTERABLE
const algo = { es: "cosa" };
//algo = {es: "no es cosa"}

/**
 * funcion anonima con auto definida: I I F E
 */

(function (num) {
  console.log(num + 1);
})(20);

let fruta = ["manzana", "naranja", "peras"];
let sinFruta = [];
const mostrarLista = (lista) => {
  if (lista.length > 0) {
    console.log(lista);
  } else {
    console.log("Lista vacía");
  }
};
mostrarLista(fruta);
mostrarLista(sinFruta);

(function (lista) {
  lista.length > 0 
  ? console.log(lista)
  : console.log("Lista vacía");
})([1,2,3]);

const crearMultiplicador = (num) => {
  return (multiplicador) => {
    console.log(num * multiplicador);
    return (duplicador = 2) => {
      console.log(num * duplicador * multiplicador);
      return (triplicador = 3) => {
        console.log(num * triplicador * multiplicador);
      };
    };
  };
};

crearMultiplicador(10)(5)()()


class Contador {
    constructor(persona){
        this.persona = persona,
        this.count = 0
    }
    static cuentatotal = 0
    getContadorMasUno(){
        this.count = this.count + 1
        Contador.cuentatotal = Contador.cuentatotal + 1
        console.log(`${this.persona} cuenta ${this.count}, entre todos se han contado ${Contador.cuentatotal}`)
    }
}

let individuo = new Contador("pepe")
individuo.getContadorMasUno()
individuo.getContadorMasUno()
individuo.getContadorMasUno()
individuo.getContadorMasUno()
individuo.getContadorMasUno()
let individuo2 = new Contador("pepito")
individuo2.getContadorMasUno()
individuo2.getContadorMasUno()
individuo2.getContadorMasUno()
individuo2.getContadorMasUno()
individuo2.getContadorMasUno()
individuo2.getContadorMasUno()
individuo2.getContadorMasUno()
individuo2.getContadorMasUno()
individuo.getContadorMasUno()
