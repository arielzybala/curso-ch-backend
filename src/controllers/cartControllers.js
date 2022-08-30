
const { productsDao, cartDao } = require("../dao/index");
const {handleEmail} = require("../utils/nodemailer");
const orderAmount = require("../utils/orderAmount");
const sendMessage = require("../utils/twilio");

const getAll = async (req, res, next) => {
  const cartData = await cartDao.listById(req.session.cart.id);
  const totalData = await orderAmount(cartData)
  req.session.totalAmount = totalData
  res.render("cartView", { cart: cartData.products , total: totalData, id:cartData.id});
};

const putOnCart = async (req, res, next) => {
  let product = await productsDao.listById(req.body.idProduct);
  const cart = await cartDao.listById(req.session.cart.id);
  //const check = cart.products.map(e => e.id === idProduct)
  product.quantity = req.body.quantity;
  cart.products.push(product);
  return await cartDao.update(cart);
};
const deleteCart = async (req, res, next) => {
  await cartDao.deleteById(req.params.id);
};

const createOrder = async(req, res, next)=>{
  const cart = await cartDao.listById(req.session.cart.id);
  const totalToPay = req.session.totalAmount
  const user = req.session.user
  const phone = ((user.codesCountry + user.phone).toString())
  const products = cart.products
  products.map((e) => delete e.id && delete e.thumbnail)
  products.push(`Total a Pagar: $ ${totalToPay}`)
  const message = "Productos seleccionados"
  await handleEmail(products, user.email , message)
  await sendMessage(phone, products)
}

module.exports = {
  getAll,
  deleteCart,
  putOnCart,
  createOrder
};
