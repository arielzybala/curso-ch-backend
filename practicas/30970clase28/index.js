const numeros = process.argv.slice(2).map((num) => Number(num))

//if (numeros.length === 0){}


for (num of numeros){
    if (isNaN(num)){
        console.log({
            error:{
                descpricion: 'uno de los datos no es numero'
                ,
                numeros:process.argv.slice(2),
                tipos: process.argv.slice(2).map((a)=> typeof a)
            }
        })
        process.exit(-5);

    }
}

const datos = {
    promedio: numeros.reduce((total, num)=> total + num) /numeros.length,
    max: Math.max(...numeros),
    min: Math.min(...numeros),
    pid: process.pid,
    ejecutable: process.title,
    numeros
}
console.log(datos)