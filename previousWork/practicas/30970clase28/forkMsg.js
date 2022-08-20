const {fork} = require('child_process')

const forked = fork('child.js')
forked.on('message', msg => {
    console.log('Mensaje del Hijo', msg)
})

console.log('comienzo de la ejecución del padre');
setTimeout(() => {
    forked.send({mensaje: 'hola!'})
}, 2000);
