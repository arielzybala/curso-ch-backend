let contador = 0
process.on('message', msg =>{
    console.log('Mensaje del Padre: ', msg)
    setInterval(() => {
        process.send({contador: contador++})
    }, 1000);
})