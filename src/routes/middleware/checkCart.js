const { cartDao } = require("../../dao");
const { flatArray } = require("../../utils/flatArray");

const haveCartAlredy = async (req, res, next) => {
  const session = flatArray(req.session);
  console.log(session)
  const findCart = session.find((e) => e == "cart");
  if (findCart) {
    next();
  } else {
    let cart = await cartDao.save();
    console.log("abrió uno nuevo")
    req.session.cart = cart;
    next();
  }
};

module.exports = { haveCartAlredy };