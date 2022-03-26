const fs = require("fs");

//SE SELECCIONA Y LEE UN ARCHIVO
//let readFile = fs.readFileSync("./test.txt", {encoding:"utf-8"});
//console.log(readFile);

//CON TRY y CATCH
//try {
//
//    let readFile = fs.readFileSync("./testC.txt", {encoding:"utf-8"});
//
//    console.log(readFile);
//} catch (error) {
//    console.log("error de lectura");
//}

//FORMA DE BORRAR
//try {
//
//  fs.unlinkSync("./testA.txt")
//    console.log("archivo Eliminado");
//} catch (error) {
//    console.log("error de de borrado");
//}

//CON ESTO SE SOBREESCRIBE EL ARCHIVO
//fs.writeFileSync("./test.txt", "Nuevo Comentario", {encoding:"utf-8"})

//let obj = [
//    {
//        name:"Ariel1",
//        lastName:"Zybala1"
//
//    },
//    {
//        name:"Ariel2",
//        lastName:"Zybala2"
//
//    }
//];
//

// CREA UN ARCHIVO NUEVO
//fs.writeFileSync("./testA.txt", JSON.stringify(obj), {encoding:"utf-8"});

// SE AGREGA TEXTO PERO NO MODIFICA
//fs.appendFileSync("./test.txt", "Nuevo Comentario, pero no pisa el anterior", {encoding:"utf-8"});

//FORMA DE LECTURA SINCRONO
//fs.readFile("./test.txt", "utf-8", (err, data)=>{
//if(err){
//    return "Error de Lectura";
//}
//console.log(data);
//});
//
//FORMA DE ESCRITURA SINCRONA
//fs.writeFile("./test.txt", "\n Nuevo Contenido Sincrono", "utf-8", (err, data)=>{
//  if(err){
//      return "Error de Lectura";
//  }
//  console.log("Se escribio OK");
//    });

//FORMA DE BORRADO SINCRONA
//fs.unlink("./test1.txt", "utf-8", (err)=>{
//    if(err){
//        return "Error de Lectura";
//    }
//    console.log("Se borro OK");
//    });

//LAS ASINCRONAS NO BLOQUEAN CICLOS

//fs.promises.readFile("./test.txt", "utf-8",)
//.then((data)=>{
//    try{
//        console.log(data)
//    } catch{
//    }
//    }).catch((err)=>{
//    throw(err)
//}
//)

//const save = async () => {
//    try{
//        let read = await fs.promises.readFile(".test.txt", "utf-8");
//        console.log(read)
//    }catch(err){
//        console.log("error")
//    }
//}
//save();

