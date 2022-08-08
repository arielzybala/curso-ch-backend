const express = require('express')
const cluster = require('cluster')
const os = require('os')
const numCPUS = os.cpus().length;
const app = express()

app.get('/', (req, res)=>{
    for (let i = 0; i < 1e8; i++) {
        const element = [i];
    }
    res.send(`La reques la tomó el CPU con el Id de Proceso ${process.pid}`)
    cluster.worker.kill()
})


if(cluster.isMaster){
    for (let i = 0; i < numCPUS; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker,code,signal)=>{
        console.log(`worker con id de proceso ${worker.process.pid} eliminado`)
        //para mantener una cantidad de cluster activos acá se puede poner un
        cluster.fork()
        // sino al eliminar el último cluster las request al sitio por parte del cliente no tendran un cpu que lo procese
    })
} else {
    app.listen(3000, ()=>{ console.log(`[${process.pid}]`)})
}
