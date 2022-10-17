const { cartDao } = require("../../dao");

const openCart = async (req, res, next) => {
  if (req.cookies.cart) {
    next();
  } else {
    let cart = await cartDao.save();
    res.cookie("cart", cart, { maxAge: 3600 * 1000 });
    next();
  }
};

const checkCartOpen = async (req, res, next) => {
  if (req.cookies.cart) {
    next();
  } else {
    await res.redirect("/onlyUser");
  }
};

module.exports = { checkCartOpen, openCart };
