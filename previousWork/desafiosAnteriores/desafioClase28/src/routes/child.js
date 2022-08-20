const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

let arrayNum = [];

const count = (cant=100000) => {
    for(let i = 0; i <= cant; i++){
        arrayNum.push(randomNumber(1, 1000))
    }
    const result = {}
    arrayNum.forEach(e => (result[e] = result[e] + 1 || 1))
    return result
}

process.on('message', (message)=>{
    const result = count(Number(message.amount));
    process.send(result);
})


module.exports = count
