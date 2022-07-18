/**
 * una cookie nos sirve para ir delimitando el ciclo de vida de un usuario
 * aspectos que hacen a que la interface de la página sea más sencilla, 
 * recordando valores elegidos por el usuario o inputs de un formulario etc 
 * guardando datos en el cliente
 * 
 * FUNCIÓN PRIMORDIAL SABER QUE X REQUEST CORRESPONDE A Z, Y o W USUARIO
 * 
 * es algo que del servidor enviamos al browser/client.
 *     compuesto por una key y un valor
 *   
 *      lo guarda el browser
 *      y es un dato que luego nos envía el browser en cada request.
 *   
 *      Pueden tener un tiempo de vida
 *
 *      Nunca se puede poner datos sensibles en la cookie
 *   
 *      cuando lo envía el back es:
 *     =>HEADER: que se llama "SET-COOKIE"
 *   
 *      Lo que nos devuelve el browser en cada request es un:
 *      =>HEADER: que se llama "COOKIE"
 *   
 *      Un cliente puede tener X cantidad de cookies o las partes de una cookie, pueden diferentes momentos de vida:
 *     los datos del carrito, pueden durar 6 meses.
 *      los datos del pedido con la dirección de correo 24hs
 *   
 *  Cookie-parser es un MIDDLEWARE
 * 
 */

const express = require("express")
const app = express()
const cp = require("cookie-parser") // Es para que podamos setear un middleware para setear las signed cookies

app.use(cp("hash")) // se puede no poner nada o un objeto con X cantidad de cualidades

//sin tiempo para ser eliminada
app.get('/set', (req , res)=>{
    // en este momento creamos la cookie que se va a sendear del server al browser
    // 'Server' es el nombre que identifica la cookie (LA KEY) 
    // 'ValorZ' este es el valor que se envía en la cookie al browser.
    // entre los headers vamos a ver que hay uno que dice set-cookie: 'Server'
    
// así la ppt --->   res.cookie('Server', 'ValorZ' ).send('cookie set')


    // El profesor lo hizo así:
    //pone ruta /set?key=laLlaveNombreDeUsuario&value=elvalor1234

    
    const {key, value} = req.query
    res.cookie(key, value) //con esto configura la cookie
    res.send('Cookie Seteada') // con esto confirma
    //al correr el get, entre los headers vamos a ver que hay uno que dice set-cookie: 'laLLaveNombreDeUsuario=elvalor1234'

    // tambien devuelve un Path=/    <<------ Ahí deberíamos indicar en que rutas queremos que opere esa cookie y las reenvíe como devuelta al backend
})

//con tiempo para ser eliminada

app.get('/cookieSigned', (req , res)=>{
    //En esta ruta ver:
    //NO REPITE NOMBRE DE LA KEY
    //NO REPITE EL VALOR
    //CUANDO LA ENVÍA NO USA EL MISMO TITULO DE HEADER
// la ppt---->>      res.cookie('Server2', 'ValorY', {maxAge:1000} ).send('cookie setEX')


//el profesor
//pone ruta /cookieSigned?key=usuario1&value=12345
const {key, value} = req.query
res.cookie(key, value, {signed: true}) 
res.send('Cookie firmada Seteada') 


})

//PARA VER QUE NOS DEVUELVE EL CLIENTE:
app.get('/verCookies', (req, res)=>{
    //DESDE EL REQ, SI SENDEAMOS Y PONEMOS ENTRE () "COOKIES" PUNTO "key", TRAEMOS EL VALUE QUE SETEAMOS
    res.send(req.cookies);
})

app.get('/verSigned', (req, res)=>{
    //DESDE EL REQ, SI SENDEAMOS Y PONEMOS ENTRE () "COOKIES" PUNTO "key", TRAEMOS EL VALUE QUE SETEAMOS
    res.send(req.signedCookies);
})

//PARA PEDIRLE A UN USUARIO/CLIENTE/BROWSER, ELIMINE UNA COOKIE
app.get("/clr", (_req, res)=>{
    //parecido a cuando sale el pedido del servidor para que almacene una cookie
    // ACA SALE EL PEDIDO CON EL MÉTODO
    //CLEARCOOKIE
    //PARA ELIMINAR UNA COOKIE X A TRAVÉS DE LA KEY ASIGNADA 
    res.clearCookie('Server').send('Cookie Clear')
})



/**
 * SIGNED COOKIES
 * 
 * LAS COOKIES SON SUCEPTIBLES DE SER COPIADAS, EDITADAS Y LEIDAS (MAN IN THE MIDDLE)
 * 
 * POR ESO EXISTEN UNAS COOKIES QUE SON ENCRIPTABLES
 * PALABRA CLAVE ES
 * """"SECRET""""
 *
 * CON ESTO SE CREA LA COOKIE, SE ENCRIPTA Y SE ENVIA, SOLO EL USUARIO Y EL SERVER LO SABEN(AL MENOS ASÍ DEBERÍA SER)
 * (SI LE ROBAN AL USUARIO EL SECRET, PUEDEN CREAR EN SU NOMBRE UNA COOKIE CON INFORMACIÓN "FIABLE")
 * 
 *  LA INFORMACIÓN DE LA COOKIE PER SE, ES HASEADA Y EL CODIGO "SECRET" CON EL QUE OPERAMOS ENTRE 
 * SERVER Y USUARIO, SE USA PARA SABER SI ALGUIEN EN EL MEDIO LA TOCÓ, LA EDITÓ O LA FALSIFICÓ LA COOKIE
 *
 * el "Secret", puede ser una cadena de caracteres(un string) o un array de strings. Si es un array, ese es el secret. 
 * Pero si es un array, son una cadena de firmas en el orden provisto
 * 
 * 
 * 
 * 
 * Así se setea
 * res.cookie('key', 'value', {Signed:true} , {maxAge: number en milisegundos} ).send('header de la cookie')
 * 
 *  
 * 
 * 
 * 
 * 
 * Así se trae
 * req.send(signedCookies.cookies.server)
 * 
 * 
 * 
 * CHECK ZOOM: ES LA POSIBILIDAD DE VER QUE ALGO COMPARTIDO Y HASEADO MANTENGA SUS VALORES INICIALES   
 */


/**
 * QUE ES UNA SESSIÓN
 * 
 * LA SESSIÓN ES UN PAQUETE DE NODE, 
 * FORJA UNA VARIABLE PARA CADA CLIENTE,
 * ES ACCESIBLE DESDE CUALQUIER PARTE DEL SITIO
 * ES INFORMACIÓN QUE SE GENERA DEL LADO DEL CLIENTE Y SE GUARDA EN EL LADO DEL SERVIDOR
 * 
 * POR LAS COOKIES SOLO VIAJA LA SESSIÓN ID
 * EN EL BACKEND SE RECIBE Y EL SE ENCARGA DE BUSCAR Y DEVOLVER LO QUE TIENE ESA SESSIÓN PREVIAMENTE CREADO
 * DEL LADO DEL CLIENTE, LA INFORMACIÓN EXISTE SOLO POR EL TIEMPO QUE TIENE ABIERTA LA SESSION
 * 
 * 
 *
 */

const session = require('express-session')
app.use(session ({
    // 1ro, El codigo que encripta los contenidos de la sessión
    secret: 'valor',
    // 2do, El resave, que lo que hace es guardar la sessión, no importa si se modificó o no. Te la pisa. Esto es para que con cada request se mantenga viva
    resave: true,
    // 3ro, El saveUninitialized, genera una session vacía, pero le permitis al usuario que mintras tanto pueda ir generando información que despues se pueda incorporar.
    saveUninitialized: true
}))



app.listen(8080 , (err)=>
    {
        !err
        ? console.log('puerto escuchado')
        : 'error'
    })
