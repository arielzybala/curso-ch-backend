const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;



// Entra al if, porque el cluster.isMaster, es true.
// Luego de clonan con el cluster y esos "hijos / secundarios", son false, por cada false se entra al else y de crea el servidor


//Si entra al if, primero señala cual es el PROCESS ID con el que incial el proceso maestro
if(cluster.isPrimary){
    console.log(`Proceso Primario corre con este id: ${process.pid} `);
    
    // Despues por cluster y fork, clona el proceso principal y lo ubica en cada nucleo existente en el procesador
    for(let i= 0; i< numCPUs; i++ ){
        cluster.fork();
    } 


    //Esto es para que cuando cerremos por consola un proceso, por su pid, nos emita un mensaje
    cluster.on('exit', (worker, code, signal)=>{
        console.log(`Nucleo Hijo: ${worker.process.pid} cerrado`)
    });


} else {
    //procesos hijos pueden buscar cualquier conección TCP
    // En este caso el un servido HTTP
    http.createServer((req, res)=>{
        res.writeHead(200);
        res.end('Hola mundo')
    }).listen(8000)
}
//Cuando sale del if, tenemos en cada nucleo, un proceso iniciado, que con el console.log() se imprime y los identificamos.
console.log(`Proceso ID: ${process.pid}`)
