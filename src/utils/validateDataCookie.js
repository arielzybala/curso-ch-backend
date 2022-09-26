const { logger } = require("./logger");

module.exports = checkIdandPrice = async (products, cart) => {
  try {
    let res = await products.filter((obj1) =>
      cart.find((obj2) => obj1.id === obj2.id && obj1.price === obj2.price)
    );
    if (res.length != cart.length)
      throw ("Han modificado datos de la cookie");
      return true
  } catch (err) {
    logger.error(err);
  }
};
