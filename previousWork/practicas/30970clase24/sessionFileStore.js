const express = require('express')
const cp = require('cookie-parser')
const session = require('express-session')
/**
 * 
 * Persistencia con FILESTORE
 * 
 */
//const fileStore = require('session-file-store')(session);
//Esta redacción nos dice, promero construyo o traigo el objeto con sus métodos, desde ('session-file-store')
//Luego esos métodos hacen un merge o se combinan con los de session, que es el objeto que traemos desde ('express-session)


// El profesor indica que así es más legible: 
const fileStoreSession= require('session-file-store')
const fileStore = fileStoreSession(session)

//INSTANCIAR SESSION

const app = express()
app.use(cp())
app.use(session({
    //seleccionamos donde se ubica la persistencia en memoria

    store: new fileStore({path: './sessions', ttl:60, retries:0 }),
    // path es a dónde aloja, 
    // ttl(time to leave) es el tiempo que queremos que dure alojada en memoria en el lado del servidor (el valor esta en seguntos), 
    // retries es en el caso de que intente ingresar a '../session' y no pueda, indica la cantidad de intentos que le damos para reintentar en ingreso
    
    //después lo mismo que se hizo la clase anterior
    secret: 'valorSecreto',
    //resave: false, // para evitar que pise el contenido anterior de la session PORQUE YA EXISTE EN MEMORIA
    //saveUninitialized: false, // PORQUE EL OBJETIVO ES QUE TOME UNA CREADA O QUE LA CREE, NO ACTUAR SIN UNA.
    //cookie: {maxAge: 300} // cuanto queremos que dure en el lado del cliente
    
    //el profesor los dejó en true
    resave: true,
    saveUninitialized: true,
}))

app.get('/', (req, res)=>{
    req.session.user = 'valorSecreto'
    res.send()
})

app.get('/obtener', (req, res)=>{
    res.send(req.session)
})

app.listen(8080 , (err)=>{
    !err
    ? console.log('Escucha en puerto 8080')
    : console.error(err , 'Error')
}
)