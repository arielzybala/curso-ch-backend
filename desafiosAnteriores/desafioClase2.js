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
        //let allTitles = [];
        //for (let {bookName} of this.libros)
        //allTitles.push(bookName);
        //console.log(allTitles);
        
        const titlesBook = this.libros.map(({bookName})=> bookName)
        console.log(titlesBook);
    }
}

let userOne = new Usuario("Ariel", "Zybala", [{bookName: "Dracula", writer: "Bram Stoker" },{bookName:"Golem", writer: "Gustav Meyrink" }] , ["Tita", "Cabsha"]);
console.log(userOne.getFullName());
console.log(userOne.countMascotas());
userOne.addMascota("Dolca");
userOne.addBook("It", "Stephen King");
userOne.getBooksNames();
console.log(userOne);
