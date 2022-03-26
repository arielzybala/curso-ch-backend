//let a = [1, 2, 3];
//console.log(a.length);
//let lista = [];
//function mostrarLista (lista) {
//    if (lista.length === 0){
//        console.log("lista vacía");
//    } else {
//        console.log(lista);
//    }
//}
//mostrarLista(lista);
//
//let lista2 = ["manzana", "naranja", "frutilla"];
//const mostrarLista2 = (lista2) =>{ lista2.length === 0 ? console.log("lista vacía") :  console.log(lista2)}
//
//mostrarLista2(lista2);


//Clausuras
//let styleDefault= 'color: white;'
//function messageCreator(type, style){
//return function message (srt){
//    console.log(`%c ${type}: ${srt}`, styleDefault, style);
//}}
//
//const error = messageCreator('Error', 'background: red;');
//const warning = messageCreator('Warning', 'background: yellow;');
//const succes = messageCreator('Succes', 'background: green;');
//error("el usuario no inicio sesión");


//Funciones Constructoras
//function People(name){
//    this.firstName = name
//    this.greet = () =>{return(`Hola, ${this.firstName}!`)}        
//    this.sayGoodbye = () =>{return(`Adios, ${this.firstName}!`)}        
//    }
//
//
//let persona1 = new People("Ariel");
//let persona2 = new People("Gustavo");
//
//console.log(persona1.firstName);
//console.log(persona2.greet());
//console.log(persona2.sayGoodbye());

//Prototype
//People.prototype.run=()=>{return(`corre, ${this.firstName}, corre!`)}

//Las instancias con NEW de la función constructora People, solo deberían tener propiedades, y los prototype, deberían tener las funciones (métodos), lo que hace que las instancias sean más livianas.

//Ejercicio
//String.prototype.reverse = function () { return this.split("").reverse().join("") }
//console.log("Ariel".reverse());




//Clases Constructoras
//class Usuario{
//    constructor(firstName, lastName, books, pets ){
//        this.nombre = firstName;
//        this.apellido = lastName;
//        this.libros = books;
//        this.mascotas = pets;
//    }
//    getFullName(){return `Usuario: ${this.nombre} ${this.apellido}`}
//    
//    addMascota(petNew){
//        this.mascotas.push(petNew);
//        return console.log(this.mascotas);
//    }
//    countMascotas(){return this.mascotas.length}
//
//    addBook(title, author){
//        let bookNew ={
//            bookName: title, 
//            writer: author,
//        };
//        this.libros.push(bookNew);
//        console.log(this.libros);
//    }
//    getBooksNames(){
//        let allTitles = [];
//        for (let {bookName} of this.libros)
//        allTitles.push(bookName);
//        console.log(allTitles);
//        
//        const titlesBook = this.libros.map(({bookName})=> bookName)
//        console.log(titlesBook);
//    }
//}
//
//let userOne = new Usuario("Ariel", "Zybala", [{bookName: "Dracula", writer: "Bram Stoker" },{bookName:"Golem", writer: "Gustav //Meyrink" }] , ["Tita", "Cabsha"]);
//console.log(userOne.getFullName());
//console.log(userOne.countMascotas());
//userOne.addMascota("Dolca");
//userOne.addBook("It", "Stephen King");
//userOne.getBooksNames();
//console.log(userOne);

//Si bien las clases almacenan los métodos personalizados que creamos en la propiedad "_proto_", cada lectura de cada instancia lee los metodos, los crea y los atribuye. No ocupa tanta memoria, pero si vuelve más lento el trabajo de lectura y creación de instancias.

//Herencia entre Clases

//class Phone{
//    constructor(brand, color, origin){
//        this.brand = brand,
//        this.color = color,
//        this.origin = origin
//    }
//    getBrand(){
//        return `La marca es: ${this.brand}`;
//    }
//}
//
//class Model extends Phone{
//    constructor(model, brand, color, origin){
//        super(brand, color, origin)
//        this.model = model
//    }
//    getModel(){
//        return `El modelo es: ${this.model}`;
//    }
//}
//
//class ModelNotColor extends Phone{
//    constructor(model, brand, origin){
//        super(brand, "", origin)
//        this.model = model
//    }
//}
//
//let product1 = new Phone("Sony", "Black", [{Country:"Japan", City: "Okinawa"}]);
//let productModel1 = new Model("XPERIA", "Sony", "Silver", {Country:"South Korea", City: "Seúl"});
//let productModel2 = new ModelNotColor("A51", "Samgung", {Country:"Singapore", City: "Queens Town"});
//
//console.log(product1);
//console.log(product1.getBrand());
//console.log(productModel1);
//console.log(productModel2);
//console.log(productModel2.origin.Country);
//console.log(productModel2.getBrand());

//function obtenerMayor(x, y){
//    (!isNaN(x) && !isNaN(y) === true) ? console.log("Son Números") : console.log("Ambos no son Números")
//}

//obtenerMayor(1, 1);
//
//const suma = (a, b) => a + b;
//const minus = (a,b) => a - b;
//const plus = (a,b) => a * b ;
//const resto = (a,b) => a / b;
//const calc = ( a , b , cb) => cb(a,b);
//console.log(calc(1,55, suma));
//


//nos permite retrasar la ejecución de una función.
//setTimeout(() => {
    //función que queremos que se ejecute.  
//}, 
//indicamos cuánto tiempo en milisegundos queremos que se retrase
//timeout);
//Si ponemos al setTimeout() en una variable ej: let variable123 = setTimeout(() => {, podemos usar en un evento "clearTimeout()" ej: clearTimeout(variable123), 
//como un desmontado nos sirve para evitar el resultado que causa la ejecución de la pieza de codigo que encapsula el setTimeOut()

//nos permite ejecutar una pieza de codigo que se ejecute periodicamente por la cantidad de tiempo que le indicamos
//setInterval(() => {
    //la pieza o función que se va a llamar para que se ejecute
//}, 
//acá le decimos cada cuantos milisegundos queremos que se repita
//interval);
//Si ponemos al setInterval() en una variable ej: let variable123 = setInterval(() => {, podemos usar en un evento "clearTimeout()" ej: clearTimeout(variable123), 
//como un desmontado nos sirve para evitar se siga ejecutando el resultado de la pieza de codigo que encapsula el setInterval()

//let id = getRandomInt(0 , 999999)
//function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
//
//
//onsole.log(id)
let objeto = [{id:1},{id:2},{id:3}]
idbuscado=2
const idFollow = objeto.map(({id})=> id === idbuscado)
        console.log(idFollow);
