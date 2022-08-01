const {spawn} = require('child_process');

const child = spawn('find', ['.']);

child.stdout.on('data', data => {
    console.log(`stdout:\n${data}`);
});
child.stderr.on('data', data => {
    console.log(`stdout:\n${data}`);
})
child.on('error', (error) =>{
    console.error(`error: ${error.message}`);
});
child.on('close', (code) =>{
    console.log(`el proceso hijo existe con el codigo: ` + code)
})

/**
 * SPAWN es una función que ejecuta un comando en un proceso.
 * 
 * Devuelve datos a través de la API DEL FLUJO.
 * 
 * Para obtener resultados hay que hacer escuchar eventos en el flujo de la api
 * 
 * los datos van siendo trabajados por pequeños trozos, usa la memoria, pero la libera rapidamente
 * 
 * 
 * DIFERENCIA EXEC Y EXECFILE: Estos guardan toda la información en la memoria de la computadora.(lo que en grandes cantidades degrada el rendimiento del sistema)
 * 
 * 
 * ESTRUCTURA DE LA FUNCIÓN SPAWN:
 * 1er argumento de spawn es el comando find.
 * 2do un array con argumentos para el comando ejecutado
 * 3ero con '.' hace que el comando find encuentre todos los activos en el directorio actual
 * 
 * Los comandos pueden devolver datos, en el flujo stdout o el flujo stderr.
 * Puede añadir oyentes invocando el método on() de cada objeto de los flujos.
 * El evento "data", nos proporciona el resultado de los comandos para ese flujo
 * El evento "error" si el comando no se ejecuta o se interrumpe
 * El evento "close" si el comando se puede ejecutar y se cierra sin problemas
 */