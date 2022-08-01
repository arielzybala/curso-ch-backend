//const { options } = require("yargs");
//
//
//
//
//
//
//
//




//const [ , , arg3 = 'base=5'] = process.argv;
//const [ , base = 5 ] = arg3.split('=');
//console.log(base);
//const base = 5
//const
/*
console.log("=======================")
console.log(`===== Tabla del ${base} =====`)
console.log("=======================")
for(let i = 1; i <= 10 ; i ++){
    console.log(`${base} x ${i} = ${base * i}`)
}
*/
//const yargs = require("yargs/yargs");
//const { hideBin } = require("yargs/helpers");
//const argv = require("yargs")
//                    .option("b", {
//                        alias: 'base',
//                        type: 'number'
//                    })
//                    .check(
//                        (argv, options)=>{
//                            console.log('yargs', argv)
//                        }
//                    )
//.argv   

//console.log(process.argv);
//console.log(argv);
//console.log("base de yargs", argv.base);
/**
const os = require('os');
const {versions} = require('process')

function singleThread() {
    console.log('___________________________')
    console.log('Id del Proceso_____________' + process.pid)
    console.log('Título_____________________' + process.title)
    console.log('Directorio de Node_________' + process.execPath)
    console.log('Directorio Actual__________' + process.cwd())
    console.log('Versión de Node____________' + process.version)
    console.log('Versiones de Dependencias__' + versions)//versions.map( (arg, argIndex) => `[${argIndex}] ${arg}`).join('\n'))
    console.log('Plataforma (S.O.)__________' + process.platform)
    console.log('Arquitectura(S.O.)_________' + process.arch)
    console.log('Tiempo Activo de Node______' + process.uptime())
    console.log('Argumentos del Proceso_____' + process.argv)
    console.log('Uso de la Memoria__________' + process.memoryUsage().rss)
    console.log("Platform:------------------" + os.platform());
    console.log("Architecture:--------------" + os.arch());
    console.log('___________________________')

}
singleThread()
//for (let key in versions){ console.log(`${versions}${[key]}`+'\n')}

'use strict';
for(let j = 0; j < process.argv.length; j++){
    console.log(j + '->' + (process.argv[j]));
}
console.log('Plataforma (S.O.)__________' + process.platform)

console.log('Memoria total Reservada__________' + process.memoryUsage().rss)

console.log('Versión de Node____________' + process.version)

console.log('Directorio de Node_________' + process.execPath)

console.log('Id del Proceso_____________' + process.pid)

console.log('Directorio Actual__________' + process.cwd())

 * 
 */


/**
 * con minimist
 */
//const parseArgs = require('minimist') 
// cuando pasamos un valor por la consola puede ser:
// aislado (sin flags: --, -.) ahí el argumento es si o si un valor en si mismo (node lo recibe como un string)[esto por convención se toma como un acronimo, es para abreviar y que no haya tanto texto en la linea de comandos]
// con una flog(-n), ahí es un argumento del que se espera un valor -d:valor o -d, valor,
// con dos flag(--n), ahí el argumento puede ser un valor en si mismo (booleano, true or false) o puede estar esperando un valor --base:10
//console.log(parseArgs(['-a', '1', '--colores', '--nombre', "Ariel"]))

//de esta manera los valores que se reciben se leeran -a 1 recibe un number valor=1, colores es un booleano igual a true, y nombre recibe un string y la cadena de caracteres es "Ariel"

//options con minimist
//DEFAULT
//let options = {default: {nombre: "Ariel", apellido: 'Zybala'}}
//console.log(parseArgs(['-a', 1, '--arg2', '2', '--arg3', '--nombre', 'Gustavo'], options))
// así pasamos argumentos por default


//ALIAS
//options = {... {alias: {a: 'campoA', b: 'campoB'}}}
//console.log(parseArgs(['-a', 1, '--arg2', '2', '--arg3', '--nombre', 'Gustavo'], options))
//así es como toma que un argumento sea entendido como otro, para abreviar por ejempo: el i de install

/**
 //ejercicio 1
 const minimist = require('minimist') //para recibir los argumentos desde la consola la configuración se pone acá
 const arg = process.argv.slice(2)
 const parsed = minimist  (arg , {default: { modo: 'prod', port: 0, debug: false}, alias:{ p: 'port', d: 'debug', m: 'modo'}}) 
 const {modo, port, debug, _} = parsed
 console.log({modo, port, debug, otros: _ });
 //node app.js 1, 2, 3, -m dev -p 8080 -d //{ modo: 'dev', port: 8080, debug: true, otros: [ 1, 2, 3 ] }
 */
 
/**
 * // ejercicio 2 
 const yargs = require('yargs/yargs')(process.argv.slice(2))
 //const args = yargs
//    .alias({
//        n: 'nombre',
//        a: 'apellido'
//    })
//   .default({ nombre: 'Ariel', apellido: 'Zybala'})
//    .argv
// ASI SE PASAN LOS DEFAULT Y LOS ALIAS EN YARGS
    
const args = yargs
.alias({
    p: 'port', d: 'debug', m: 'modo'
})
.default({ modo: 'prod', port: 0, debug: false}).boolean('debug')
.argv 

const {modo, port, debug, _} = args
console.log({modo, port, debug, otros: _})
*/

/**
 * 
 */
 const yargs = require('yargs/yargs')(process.argv.slice(2))
 const args = yargs
.alias({p: 'PORT'}).default({ PORT: 8080}).argv 
const PORT = args.PORT;
console.log(PORT)
//const {MODO, PUERTO, DEBUG} = process.env
//console.log({ modo: MODO || 'PROD', puerto: PUERTO || 0, debug: DEBUG || false})
/*
require('dotenv').config()
//console.log(process.env)
const fondo = process.env.FONDO
const frente = process.env.FRENTE
console.log(fondo, frente)
*/

/**
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({
    path:
        process.env.MODO == 'byn'
        ? path.resolve(__dirname, 'byn.env')
        : path.resolve(__dirname, 'colores.env')
})

const fondo = process.env.FONDO 
const frente = process.env.FRENTE
console.log(fondo, frente)
 * 
 */
/**
 * ejercicio 3
 */

/**
 * personal
 const path = require('path')
 const dotenv = require('dotenv')



dotenv.config({
    path:
    process.env.DEFAULT == undefined
    ? path.resolve(__dirname, 'default.env')
    : console.error("error")
})

const {modo, puerto, debug  } = process.env
console.log(modo, puerto, debug)
//modo=dev puerto=8080 debug=true
 */