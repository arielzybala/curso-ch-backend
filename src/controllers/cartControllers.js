const { usersDao } = require("../dao/index");
const { productsDao, cartDao } = require("../dao/index");
const { checkTokenJwt } = require("../routes/middleware/jsonWebToken");
const { CartService } = require("../services/cartServices");
const { handleEmail } = require("../utils/nodemailer");
const orderAmount = require("../utils/orderAmount");
const sendMessage = require("../utils/twilio");
const service = new CartService();

const getAll = async (req, res, next) => {
  const cart = await service.bringCartSummary(req.cookies.cart.id);
  res.render("cartView", {
    cart: cart.data.products,
    total: cart.total,
    id: cart.data.id,
  });
};

const putInCart = async (req, res, next) => {
  await service.saveInCart(
    Number(req.body.idProduct),
    req.body.quantity,
    req.cookies.cart.id
  );
};

const deleteCart = async (req, res, next) => {
  await service.deleteProduct(req.params.id);
};

const createOrder = async (req, res, next) => {
  await service.purchaseOrder(req.cookies.cart.id, req.cookies.jwt )
  /**
   * 
   const cart = await cartDao.listById(req.session.cart.id);
   const totalToPay = req.session.totalAmount;
   const userCookie = checkTokenJwt(req.cookies.jwt);
   const user = await usersDao.listById(userCookie.id);
   const phone = (user.codesCountry + user.phone).toString();
   let products = cart.products;
   products.map((e) => delete e.id && delete e.thumbnail);
  products.push(`Total a Pagar: $ ${totalToPay}`);
  const message = "Productos seleccionados";
  await handleEmail(products, user.email, message);
  await sendMessage(phone, products);
  */
};

module.exports = {
  getAll,
  deleteCart,
  putInCart,
  createOrder,
};
