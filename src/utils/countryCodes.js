const fs = require("fs/promises");
const { logger } = require("./logger");

const phoneCodes = async () => {
  try {
    const data = await fs.readFile("./src/services/userWebServices/countryCodes.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    logger.error(`Error al leer el archivo: ${error}`);
    return [];
  }
};

module.exports = phoneCodes;
