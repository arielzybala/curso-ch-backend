/*

OBJETIVO: El rendimiento y el consumo de recursos resulta una preocupación clave.


/////////////////////////DENTRO DEL CÓDIGO SE PUEDE HACER:

>>>USAR GZIP: 

Buena Practica: Al desplegarla una app en "producción", utilizar la compresión de gzip en el arranque.

Actua como una función síncrona.
Evite su uso en producción en el uso de la app.
COMPRIME LAS RESPONSE.
Es un MIDDLEWARE de compresión.
Viene como un modulo de NODE. 

SI LA APP tiene un TRÁFICO ELEVADO en producción, NO SIRVE.

Sólo se justifica su uso en el arranque inicial.

Como llamarla:
const express = require('express')
const compression = require('compression')
const app = express()
app.use(compression())

>>>REGISTRO CORRECTO DE LA ACTIVIDAD
Usar console.log() o .err(), es normal en desarrollo.
En producción los console, al ser sincronos, no son recomendados.

Motivos para realizar un registro(en producción):
A efectos de depuración: usar DEBUG
Registro de actividad: usar Winston o Bunyan

El objetivo es entender nuestro rendimiento y el contexto de lo que sucede en la app.


>>MANEJO CORRECTO DE LAS EXCEPCIONES

Una excepción que no esta gestionada en el código, bloquea la aplicación.

En producción lo que se busca es que haya caminos cerrados, 
catcheando las expceciones y evitando que la app se bloquee/crasheando y dejando de funcionar.

Es mejor que se reinicie a que se trabe.

Para eso usamos try/Catch y Promises.





////////////////////////DENTRO DEL ENTORNO/CONFIGURACIÓN SE PUEDE HACER:

>>USAR LA VARIABLE DE ENTRONO "NODE_ENV"

NODE_ENV especifica el entorno en el que se ejecuta una aplicación (ej: "desarrollo", "producción", etc)

Todos los "console" que usamos en Desarrollo, se pueden gestionar y al usar NODE_ENV con el valor en "producción", podemos elegir qué "console" dejar trabajando y cuales evitar que se implementen.

Lo mismo ocurre con piezas de codigo que perciben una variable u otra, dependiendo de que env estamos pidiendo que lea (sea el env.developer o el env.production).
Como consultarla: process.env.NODE_ENV

>>REINICIO AUTOMATICO DE LA APP
Son bloqueables tanto la app, como el servidor.

Si por algún motivo se cae el servidor, es importante que la App, se tienda a reiniciar. Ej: lo que hacía pm2 o forever con los cluster.

Modos de evitar:
Usar un gestor de procesos como PM2.
Usar el sistema inir que proporciona OS para reiniciar el gestor de procesos cuando se bloquea el OS.

>>INICIAR PROCESOS DE LA APP EN LOS CLUSTER

MEJORA DE RENDIMIENTO: Deribando partes/instancias del proceso principal entre los nucleos a través de los worker, lo que permite distribuir la carga y las tareas entre las instancias.

AISLAMIENTO DE ERRORES: Al ejecutar instancias del proceso en los clústers. Cuando ocurra un bloqueo, del proceso worker, hay que asegurarse de registrar el suceso y generar un nuevo proceso, utilizando cluster.fork().


>>ALMACENAR (CACHEAR)

Se almacena en el CACHE, el resultado de las solicitudes(el contenido, estatico/dinámico repetitivo, ej: imágenes, eventos estéticos en js)

Se puede configurar en el server principal.

Se puede usar un Servidor Proxy como NGINX, facilita la separación de este contenido, y así se aumenta la velocidad de respuesta. 

SERVER PROXY BALANCEADOR DE CARGA

A mayor cantidad de instancias ejecutadas, MÁS Y MEJOR DISTRIBUCIÓN DE LA CARGA DE PROCESAMIENTO. Un proxy inverso que orquesta el tráfico "hacia" y "desde" los servidores y las instancias de aplicación.
*/




/*
LOGGERS
Son el elemento más importante para entender que sucede con nuestro sistema en producción. Sean errores o anomalías.

Si los logs no tienen un registro o no se tiene un modo de gestionar, cada petición hará que se pierda el hilo y no se podrá entender correctamente cual es la anomalía en el comportamiento o que es lo que origina el error efectivamente.

Por eso se crea un "HISTORIAL DE LOG", que a través de un IDENTIFICADOR ÚNICO permite llevar un REGISTRO SECUENCIAL de cada uno de los eventos que afectan UN PROCESO EN PARTICULAR constituyendo una evidencia del comportamiento del sistema.

Los loggers son librerías. QUE:
1) CREAN UN IDENTIFICADOR ÚNICO QUE ES OTORGADO A UN PETICIONANTE.
2) CREAN UN REGISTRO DE ACTIVIDAD QUE PERTENECE A UN SOLO IDENTIFICADOR UNICO.
3) ALMACENAN EL REGISTRO DE ACTIVIDAD DE UN REGISTRO DE ACTIVIDAD.

PERMITEN:
NO USAR CONSOLE.LOG() sino logger."level" ej: logger.warn, logger.error, logger.fatal, etc
CREAR NIVELES DE DEBUG
GUARDAR REGISTROS O ENVIARLOS
*/

/*
LOG4JS
Tiene dos keys en su configuración:

1) APPENDERS: son los encargados de escribir el log(). En el caso de log4js, también dicen con que nombre y cómo se guardanrán/envianrán/imprimirán. Nosotros definimos esto, para que despues las categorias tomen la forma que queremos.
2) CATEGORIES: son los encargados de determinar en que niveles vamos a separar los eventos loggeados de nuestra app. 
Niveles de salida: 
trace= es tracear, es el registro que se pone a cada paso, para saber en que lugar del algoritmo esta.
debug= es el que indica cuando entramos y salimos de una funcion, indicando que datos maneja.
warning= son las anomalías que no impiden que se desenvuelva bien o cumpla con los objetivos la aplicación. Son fallas de rendimiento
errors= son los log's sobre cuestiones criticas que al suceder crashean una parte de la app, y la bloquean parcialmente en algún aspecto del trabajo del argumento del algoritmo.
fatal= son los log's sobre cuestiones críticas que crashean de tal modo la app, que la bloquean o la hacen reiniciar.

Un nivel "warn" puede estar encargado de imprimir: Warnings, Errors y Fatals logs

En Producción usaríamos un WARN o ERROR para arriba.
En Desarrollo usaríamos un nivel que incluya desde TRACE.
Y ESTO SE PUEDE HACER SIN TENER QUE MODIFICAR TODO EL CODIGO. PORQUE LOS LOGGERS SE INICIAN EN UN NIVEL CUANDO SE ARRANCA LA APP.

paquete para instalar es npm i log4js

a) cómo traer el módulo 

const log4js = require("log4js");
const logger = log4js.getLogger();

b) cómo setear el level (Siempre pensar que el level tiene que tener una relación con las categorías)

logger.level = "warn" (lo mejor es un process.env.LEVEL - para ingresarlo a la hora de iniciar el servidor)

c) configuración típica de appender y categories

log4js.configure({
    appenders: {
    logConsole: { type: "console" },
    fileForProduction: { type: "file", filename: "logsRegistProd.log" },
    fileForDeveloper: { type: "file", filename: "logsRegistDev.log" },
    forDevelompent: { type: "logLevelFilter", appender: "fileForDeveloper", level: "trace"},
    forProduction: { type: "logLevelFilter", appender: "fileForProduction", level: "warn"}
},
categories: {
    default: { appenders: ["logConsole"], level: "info" },
    development: { appenders: ["logConsole","forDevelompent"], level: "trace" }, //con esto imprime en archivo todo y lo pasa también por consola
    production: { appenders: ["forProduction"], level: "warn" },//con esto solo imprime en archivo, desde los warn, y luego lo que queda en escala: error y fatal
},
});


d) Cómo configurar los mensajes
logger.trace("Por este lugar de la aplicación estamos");
logger.debug("Estos son los datos que entraron en esta función");
logger.info("Si estas acá es porque ya paso X cosa");
logger.warn("Se tubo que usar esta pieza de código, porque falló la que lleva mejor rendimiento");
logger.error("No se puede seguir a partir de este punto, por este error");
logger.fatal("La app, quedo bloqueada por esto o se tubo que reiniciar por esto");


*/


/*
WINSTON

Un TRANSPORTE nos permite almacenar mensajes personalizados de seguimiento en un archivo plano o desplegado por consola

El igual que log4js, solo que a diferentes niveles puede configurar distintos transportes en vezz de appenders.

Los levels son Silly, Debug, Verbose, Info, Warn, Error.

Asi la llamamos:
const winston = require('winston')


Así se configura
const logger = winston.createLogger({ //se crea una configuración de niveles
   level: 'warn', //se indica el nivel
   transports : [ // se indica por que medios se va a manifestar el logger
       new winston.transports.Console({ level:'verbose' }), // desde verboso se imprime en consola (los Silly y debug, no)
       new winston.transports.File({ filename: 'info.log', level:'error' }), // Solo los errores se imprimen en archivo
   ]
})

para los loggers
logger.log('level','mensaje')
ej: logger.log('warn','esta pieza de codigo se activo porque fallo la otra')
También acepta
logger.warn("esta pieza de codigo se activo porque fallo la otra")

*/