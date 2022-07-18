const express = require('express')
const cp = require('cookie-parser')
const session = require('express-session')
/**
 * 
 * Persistencia con REDIS
 * 
 * ABRIR UBUNTUSHELL PRIMERO
 * PONER:
 * sudo service redis-server start
 * 
 * DESPUÉS
 * INICIAR EN LA CARPETAAAAAAAAAAAA
 * EL CLI
 * SE USA:
 * redis-cli
 * PARA PROBAR QUE ANDA MANDAS
 * ping
 * TE DEVUELVE PONG
 */
const redis = require('redis')
const client = redis.createClient({legacyMode: true})
// en la ppt no tiene el legacyMode: true
const RedisStore = require('connect-redis')(session)


const app = express()
app.use(cp())
app.use(session({
/**
 * con este bloque se configura redis
 */
    store: new RedisStore({
        host: 'localhost',
        port: 6379,
        client: client,
        ttl: 60
    }),

//mismo set que para sessionMemory o sessionFileStore
    secret: 'valorSecreto',
//el profesor solo dejo Secret
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))


app.get('/', (req,res) => {
    const {user, pass} = req.query
    req.session.user = user
    req.session.pass = pass
    if (req.session.contador){
        req.session.contador++
        res.send(`${user || "Señor usuario"} ha visitado el sitio ${req.session.contador} veces`)
    } else {
        req.session.contador = 1
        res.send(`Bienvenido! ${user || "nuevo usuario"}`)
    }
})

app.get('/olvidar', (req,res) => {
    let user = req.session.user
    req.session.destroy( (err) => {
        if(!err){
            res.send(`Hasta luego  ${user || "querido usuario"}`)
        }
        else{
            res.send({error : 'Error al cerrar la sesión', body: err}) , req.session.contador = 0
        } 
    })
})

app.get('/info', (req,res) => {
    console.log('------------ req.session -------------')
    console.log(req.session)
    console.log('--------------------------------------')
//
 // console.log('----------- req.sessionID ------------')
 // console.log(req.sessionID)
 // console.log('--------------------------------------')
//
  // console.log('----------- req.cookies ------------')
  // console.log(req.cookies)
  // console.log('--------------------------------------')

    //console.log('---------- req.sessionStore ----------')
    //console.log(req.sessionStore)
    //console.log('--------------------------------------')

    res.send('Send info ok!')
})





// ESTO NO ESTA EN LA PPT----> ES QUE LAS VERSIONES NUEVAS LO NECESITAN
client.connect().then(()=>{
    app.listen(8080 , (err)=>{
        !err
        ? console.log('Escucha en puerto 8080')
        : console.error(err , 'Error')
    }
    )
})