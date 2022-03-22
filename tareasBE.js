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
class Usuario{
    constructor(firstName, lastName, books, pets ){
        this.nombre = firstName;
        this.apellido = lastName;
        this.libros = books;
        this.mascotas = pets;
    }
    getFullName(){return `Usuario: ${this.nombre} ${this.apellido}`}
    
    addMascota(petNew){
        this.mascotas.push(petNew);
        return console.log(this.mascotas);
    }
    countMascotas(){return this.mascotas.length}

    addBook(title, author){
        let bookNew ={
            bookName: title, 
            writer: author,
        };
        this.libros.push(bookNew);
        console.log(this.libros);
    }
    getBooksNames(){
        let allTitles = [];
        for (let {bookName} of this.libros)
        allTitles.push(bookName);
        console.log(allTitles);
        
        const titlesBook = this.libros.map(({bookName})=> bookName)
        console.log(titlesBook);
    }
}

let userOne = new Usuario("Ariel", "Zybala", [{bookName: "Dracula", writer: "Bram Stoker" },{bookName:"Golem", writer: "Gustav Meyrink" }] , ["Tita", "Cabsha"]);
//console.log(userOne.getFullName());
//console.log(userOne.countMascotas());
//userOne.addMascota("Dolca");
//userOne.addBook("It", "Stephen King");
userOne.getBooksNames();
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
