const fs = require("fs");
  
  class Contenedor {
    constructor(fileName) {
      this.fileName = fileName;
      this.id = 0
    }
  
    save(obj) {
      fs.promises.readFile(`./${this.fileName}`, "utf-8")
      .then((data) => {

          if (data.length <= 0) {
            this.id = 1 
            data = [{ ...obj, ...{id: this.id}},];
            fs.writeFile(`./${this.fileName}`, JSON.stringify(data, null, 2), "utf-8", (err) => {
              if (err) {
              console.log(err, "Error en la lectura");
              } else {
              console.log(`El identificador asignado es: ${this.id}`);
              }     
            })
          } else{
            this.id = (JSON.parse(data).length) + 1;
            let product = JSON.parse(data);
            let prodNew = { ...obj, ...{id: this.id}, };
            
            product.push(prodNew);
            fs.writeFile(`./${this.fileName}`, JSON.stringify(product, null, 2), "utf-8", (err) => {
              if (err) {
              console.log(err, "Error en la lectura");
              } else {
              console.log(`El identificador asignado es: ${this.id}`);
              }})
          }
      }).catch((err) => {
        throw (err, "No se pudo realizar la tarea solicitada");
      });
    }

    getById(ident) {
        fs.promises.readFile(`./${this.fileName}`, "utf-8")
        .then((data) => {
          let obj = JSON.parse(data).find((e) => e.id == ident);
          obj? console.log(`El id tiene esta instancia: ${JSON.stringify(obj)}`) : console.log("No se encontró una instancia del objeto con ese ID");
        }).catch((err) => {
          throw (err, "No se pudo realizar la consulta");
        });
    }
  
    getAll() {

      fs.promises.readFile(`./${this.fileName}`, "utf-8")
        .then((data) => { 
            console.log(JSON.parse(data));
        }).catch((err) => {
          throw (err, "No se pudo realizar la consulta");
        });
    }
  
    deleteById(ident) {
      
      fs.promises.readFile(`./${this.fileName}`, "utf-8")
        .then((data) => {
          let idFollow = JSON.parse(data).some(({ id }) => id === ident);
          
          if (idFollow) {
          
              let obj = JSON.parse(data).filter((e) => e.id != ident);
      
              data = obj;
      
              fs.writeFile(`./${this.fileName}`, JSON.stringify(data, null, 10),"utf-8", (err) => {
              
                  if (err) {
                      console.log(err,"No se pudo ingresar el nuevo objeto al archivo");
              
                  } else {
                      console.log(`La instancia del ID: ${ident} fue borrada`);
                  }
            });
          } else { 
              console.log(null);
          }
        }).catch((err) => {
              throw (err, "No se pudo realizar la tarea solicitada");
              
        });
    }
  
    deleteAll(){
  
      fs.promises.readFile(`./${this.fileName}`, "utf-8")
      .then((data) => {
     
          if(JSON.parse(data).length == 0){
          
              console.log("No hay instancias por borrar")
          
          } else{
          
              data = [];    
              
              fs.writeFile(`./${this.fileName}`,JSON.stringify(data, null, 0),"utf-8",(err) => {
                  if (err) {
                    console.log(err, "No se pudo realizar la tarea de Borrado");
                  } else {
                    console.log(`Se han eliminado todas las instancias del objeto, en el archivo ${this.fileName}`);
                  }})
          }
      }).catch((err) => {
      
          throw (err, "No se pudo encontar el archivo consultado");
      
      });
      
    }
  }
  
  let fileToUse = new Contenedor("test.json");
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  let objet = {
    title: "TV LED",
    price: getRandomInt(0, 299999),
    thumbnail: "url/.com",
  };
  
  //Para probar si agrega si no esta repetido y para ingresar un primer objeto
  //fileToUse.save(objet);
  
  //Para consultar por Uno
  //fileToUse.getById(1);
  
  //Para consultar por todos
  //fileToUse.getAll()
  
  //Para Borrar por Id
  //fileToUse.deleteById(1);
  
  //Para Borrar todo
  //fileToUse.deleteAll();
  


//const fs = require("fs");
//
//function getRandomInt(min, max) {
//    return Math.floor(Math.random() * (max - min)) + min;
//  }
//  
//  class Contenedor {
//    constructor(fileName) {
//      this.fileName = fileName;
//    }
//  
//    save(obj, ident) {
//        fs.promises.readFile(`./${this.fileName}`, "utf-8")
//          .then((data) => {
//            if (data.length == 0) {
//            data = [{...ident, ...obj,},];
//
//            fs.writeFile(`./${this.fileName}`, JSON.stringify(data), "utf-8", (err) => {
//
//              if (err) {
//              console.log(err, "Error en la lectura");
//              } else {
//              console.log(`El identificador asignado es: ${ident.id}`);
//              }
//
//            });} else if (data.length > 1) {
//              let idFollow = JSON.parse(data).some(({ id }) => id === ident.id);
//
//            if (idFollow) {
//              let product = JSON.parse(data).filter((e) => { return e.id != ident.id;});
//
//              const prodModificated = { ...ident, ...obj, };
//
//              product.push(prodModificated);
//
//              fs.writeFile(`./${this.fileName}`, JSON.stringify(product), "utf-8", (err) => {
//                if (err) {
//                  console.log(err, "Error en la lectura");
//                } else {
//                  console.log(`El ID: ${ident.id}, se encontraba repetido, el nuevo precio es ${JSON.stringify(prodModificated.price)}`);}
//                });
//            } else {
//              let product = JSON.parse(data);
//
//              const prodNew = { ...ident, ...obj, };
//
//              product.push(prodNew);
//
//              fs.writeFile( `./${this.fileName}`, JSON.stringify(product), "utf-8", (err) => {
//                if (err) {
//                console.log(err, "Error en la lectura");
//                } else {
//                console.log(`El identificador asignado es: ${ident.id}`);
//            }
//            });}}
//        }).catch((err) => {
//          throw (err, "No se pudo realizar la tarea solicitada");
//        });
//      }
//  
//    getById(ident) {
//        fs.promises.readFile(`./${this.fileName}`, "utf-8")
//        .then((data) => {
//          let obj = JSON.parse(data).find((e) => e.id == ident);
//          obj? console.log(obj) : console.log("No se encontro una instancia del objeto con ese ID");
//        }).catch((err) => {
//          throw (err, "No se pudo realizar la consulta");
//        });
//    }
//  
//    getAll() {
//
//      fs.promises.readFile(`./${this.fileName}`, "utf-8")
//        .then((data) => { 
//            console.log(JSON.parse(data));
//        }).catch((err) => {
//          throw (err, "No se pudo realizar la consulta");
//        });
//
//      }
//  
//    deleteById(ident) {
//      fs.promises.readFile(`./${this.fileName}`, "utf-8")
//        .then((data) => {
//          let idFollow = JSON.parse(data).some(({ id }) => id === ident);
//          
//          if (idFollow) {
//          
//              let obj = JSON.parse(data).filter((e) => e.id != ident);
//      
//              data = obj;
//      
//              fs.writeFile(`./${this.fileName}`, JSON.stringify(data),"utf-8", (err) => {
//              
//                  if (err) {
//                      console.log(err,"No se pudo ingresar el nuevo objeto al archivo");
//              
//                  } else {
//                      console.log(`La instancia del ID: ${ident} fue borrada`);
//                  }
//            });
//          } else { 
//              console.log(null);
//          }
//        }).catch((err) => {
//              throw (err, "No se pudo realizar la tarea solicitada");
//              
//            });
//          }
//  
//    deleteAll(){
//  
//      fs.promises.readFile(`./${this.fileName}`, "utf-8")
//      .then((data) => {
//          if(data.length > 0){
//          
//              console.log("No hay instancias por borrar")
//          
//          } else{
//          
//              data = [];    
//              
//              fs.writeFile(`./${this.fileName}`,JSON.stringify(data),"utf-8",(err) => {
//                  if (err) {
//                    console.log(err, "No se pudo realizar la tarea de Borrado");
//                  } else {
//                    console.log(`Se han eliminado todas las instancias del objeto, en el archivo ${this.fileName}`);
//                  }})
//          }
//      }).catch((err) => {
//          throw (err, "No se pudo encontar el archivo consultado");     
//      });
//      
//  }
//  
//  }
//  
//  let fileToUse = new Contenedor("test.json");
//  
//  let obj1 = {
//    title: "TV LED",
//    price: getRandomInt(0, 999999),
//    thumbnail: "url/.com",
//  };