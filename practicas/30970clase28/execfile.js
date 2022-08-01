const {execFile} = require('child_process')

execFile( __dirname + '/ACÁ ARCHIVO EJECUTABLE', (error, stdout, stderr)=>{
    if(error){
        console.error(`error: ${error.message}`)
        return;
    }
    if(stderr){
        console.error(`stderr ${stderr}`)
        return;
    }
    console.log(`stdout:\n${stdout}`)
})

/**
 * LA DIFERENCIA ENTRE EXEC y EXECFILE:
 * -> el primer argumento del método es un ruta de directorio __dirname
 * -> el resultado del archivo ejecutable se guarda en un bufer exec() // se entra por un callback con los mismos argumentos de exec()
 * 
 * //// el callback tipo exec se usa solo después del llamado de execFile
 * 
 * 
 */