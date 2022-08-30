const fs = require('fs/promises')
const { logger } = require("./logger");

module.exports.phoneCodes = async () =>{

    fs.readFile('./src/mocks/countryCodes.json', 'utf-8')
    .then(info => {
        return info
    })
    .catch(error => {
        logger.error(`No pude encontrar o leer el archivo con Prefijos internacionales ${error}`)
    })
    
}

