const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

let arrayNum = [];

function cuenta(cant=100000000) {
    for(let i = 0; i <= cant; i++){
        arrayNum.push(randomNumber(1, 1000))
    }
}


cuenta()
const result = {}
arrayNum.forEach(e => (result[e] = result[e] + 1 || 1))
console.log(result)


