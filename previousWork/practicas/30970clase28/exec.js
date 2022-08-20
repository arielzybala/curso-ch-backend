const {exec} = require('child_process')

exec('ls -lh', (error, stdout, stderr)=>{
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
 * al ejecutar el archivo
 * Se va a ver 
 * 
 * -> enumerados el contenido de la carpeta donde esta ese proceso hijo
 * -> el tamaño que ocupa en memoria (arriba de los anteriores)
 * -> Nombre de usuario y grupo de trabajo
 * -> ultima fecha de modificación de los archivos
 */