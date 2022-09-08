const { cartDao } = require("../../dao");
const { flatArray } = require("../../utils/flatArray");

const haveCartAlredy = async (req, res, next) => {
  const session = flatArray(req.session);
  const findCart = session.find((e) => e == "cart");
  if (findCart) {
    next();
  } else {
    let cart = await cartDao.save();
    req.session.cart = cart;
    next();
  }
};

module.exports = { haveCartAlredy };
