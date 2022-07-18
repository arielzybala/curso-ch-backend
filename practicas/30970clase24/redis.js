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
 * 
 * 
 * los comandos en la shell
 * 
 * 1) son SET key vaule EX 30 
 * key (es la cadena de caracteres por la que vamos a encontrar el valor que queremos) 
 * value (es un string)
 * EX le dice en segundos cuanto va a durar
 * 
 * 2) GET key 
 * con GET la y el string que le asignamos a la key, nos devuelve el Value
 * 
 * 3) ttl key
 * nos indica que tiempo de vida tiene
 * 
 * 4) EXPIRE key 10
 * con esto le pedimos que elimine una key con x cantidad de tiempo en segundos
 * 
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
        ttl: 300
    }),

//mismo set que para sessionMemory o sessionFileStore
    secret: 'valorSecreto',
//el profesor solo dejo Secret
    resave: true,
    saveUninitialized: true,
}))

app.get('/', (req, res)=>{
    req.session.user = 'valorSecreto'
    res.send("Seteada la session")
})

app.get('/obtener', (req, res)=>{
    res.send(req.session)
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