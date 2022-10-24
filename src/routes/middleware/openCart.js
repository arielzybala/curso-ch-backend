const { CartService } = require("../../services/cartServices");
const service = new CartService()

//ESTE MIDD CREA EL CARRITO
const openCart = async (req, res, next) => {
  if (req.cookies.cart) {
    next();
  } else {
    let cart = await service.createCart();
    res.cookie("cart", cart, { maxAge: process.env.TERMLIMIT });
    next();
  }
};

//ESTE MIDD VERIFICA QUE EL CARRITO EXISTA ENTRE LAS COOKIES, SINO PIDE UNA SESSIÓN ACTIVA
const checkCartOpen = async (req, res, next) => {
  if (req.cookies.cart) {
    next();
  } else {
    await res.redirect("/onlyUser");
  }
};

module.exports = { checkCartOpen, openCart };
