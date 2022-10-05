const { cartDao } = require("../../dao");

const haveCartAlredy = async (req, res, next) => {
  if (req.cookies.cart) {
    next();
  } else {
    let cart = await cartDao.save();
    res.cookie("cart", cart, { maxAge: 3600 * 1000 })
    next();
  }
};

module.exports = { haveCartAlredy };