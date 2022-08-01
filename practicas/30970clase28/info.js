/*
 * 
 * PROCESS
 * Es una variable global disponible en NodeJS 
 * Contiene diversos métodos, eventos y propiedades
 * SOBRE EL PROCESSO EN EJECUCIÓN DE UN SCRIPT DE NODE
 * ES GLOBAL NO NECESITA REQUIRE()
 * Algunos ejemplos:
 * cwd() (la carpeta donde esta la app.js o index.js o main.js)
 * pid (id del proceso en ejecución)
 * version(de node)
 * platform(nombre del sistema operativo) 
 * memoryUsage()[es una función que devuelve distintos valores como memoria total reservada rrs]
 * 
 * MATAR UN PROCESO
 * 
 * MÉTODO: process.exit()
 * Puede recibir opcionalmente un código de salida: process.exit(2) -ese numero sería como un codigo de error, para que el desarrollador pueda interpretar y explicar el cierre "por interrupción obligatoria"-
 * 
 * El método provocará que el programa acabe, incluso en el caso que haya operaciones asíncronas
 * PARA QUÉ? Porque ayuda a no se sobrecarguen los recursos
 * 
 * 
 * FUNCIÓN ===>///// PROCESS.ON()
 * Está escuchando un evento que es señalado por el desarrollador(los eventos ya estan predefinidos no son elegidos por el dev), durante todo el proceso que se ejecuta.
 * Cada vez que sucede ese evento se puede definir con un callback, que hacer con él.
 * 
 * 
 * process.on("evento señalado", callback-que se ejecuta en consecuencia-)
 * 
 * PROCESS.ON() =>>>> BEFORE EXIT --
 * Evento, ejecutado antes de la salida(del exit) del proceso, puede realizar llamadas asincrónicas y, por lo tanto, hacer que el proceso de Node continúe, aún después del exit.
 * 
 * EL objetivo de beforeExit es para limpieza
 * 
 * process.on('beforeExit', (code)=>{
 *                          ______el callback
 *             __________el evento
 * __________el metodo
 * console.log('Process beforeExit event with code:', code);
 * });
 * 
 * beforeExit, se ejecuta siempre al cerrar un proceso, si el dev pide que al escucharlo, se ejecute algo es así. Por este medio
 * 
 * 
 * Si emitis un:
 *              process.exit(25)
 * 
 * 
 * NODEJS va a realiar dos acciones (de estas dos emisiones no tenemos contros):
 *                                                                               process.emit("beforeExit", 25)
 *                                                                               process.emit("exit", 25)
 * 
 * Ahí el dev, puede hacer un:
 *                              process.on("beforeExit", (code)=>{
 *                                  console.log("el codigo de salida fue", code);
 *                              });
 *                               process.on("exit", (code)=>{
 *                                  console.log("el codigo de salida fue", code);
 *                              });
 * 
 * 
 * PROCESS.ON() =>>>> EXIT --
 * 
 * El evento exit, se emite entre las últimas instancias del proceso que esta por cerrar NODEJS, sus ciclos de trabajo ya no tienen más cosas por hacer.
 * 
 * No hay forma de ecitar la salida del bucle y una vez que todas las piezas del codigo que sean oyentes de "exit", hayan terminado de ejecutarse, el proceso va a terminar
 * 
 * 
 * 
 * PROCESS.ON()=>>>>> UNCAUGHTEXCEPTION
 * 
 * El evento unCaughtException, es para captar aquellos errores que fueron trepando por la pila de ejecución y llegaron al stack sin ser cacheados por ninguna otra pieza de código. 
 * 
 * TREPAR/BURBUJEAR(una funcion "A", que llama a otra "B", que llama a otra "C" , que llama a otra D, que llama N que tiene un error. Ahí el error se devuelve a "D", que no lo tiene cacheado, después a "C" -que tampoco lo cachea-, despues "B" -lo mismo-, llega a "A" y llega al stack sin cachear el error )
 * 
 * Es un mecanismo para trabajar excepciones; y agregado el listener lo que hace es evitar la acción por default que es la impresión de una traza del stack y salir/cerrar el proceso)
 * 
 * 
 *          process.on ('uncaughtException', function(err){
 *                  console.log('Excepción recogida' + err )
 *          });
 * 
 * 
 * 
 * PROCESS.EXECPATH
 * 
 * La propiedad process.execPath, devuleve el nomde de la ruta absoluta del ejecutable que inicio el proceso de NODEJS
 * 
 * STD=standar IN input // OUT output // ERR error
 * 
 * STDIN => en linea de comandos(CLI), toma lo que se escribe en la linea de comandos -lo lee como un string-
 * STDOUT => esto devuelve un string
 * STDERR => devuelve un error con un string
 * 
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 
 * SINGLE THREAD
 * 
 * Un programa escrito en NODEJS, se dispone en un hilo unico de ejecución.
 * 
 * ventaja: ->los recursos son faciles de enfocar 
 *          ->usa menos recursos
 * desventaja: -> necesita de sub procesos, para trabajar tareas bloqueantes sino, no avanza
 * 
 * 
 * El hilo principal atiende solicitudes, y puede levantar de manera interna otros procesos para realizar nuevas solicitudes
 * 
 * 
 * ///////// CHILD PROCESS
 * la arquitectura de node, lleva a operaciones que podrían ser bloqueantes a los child Process, que son como sub canales que evitan el desborde o tapon del hilo principar de tareas. Para que por el hilo principal corra las piezas de trabajo más pequeñas o sencillas de trabajos de trabajo
 * 
 * 
 * 
 * Los procesos hijos solo pueden ser creados por un proceso padre.
 * 
 * En nodejs se puede ejecutar un comando para que se pueda escuchar outputs e inputs de esos procesos hijo
 * 
 * 4 formas diferentes de crear CHILD PROCESS
 * 
 * -> EXEC()            ->SPAWN()
 * 
 * -> EXECFILE()        ->FORK()
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */