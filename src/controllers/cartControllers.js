const { CartService } = require("../services/cartServices");
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
  await service.purchaseOrder(req.cookies.cart.id, req.cookies.jwt);
};

module.exports = {
  getAll,
  deleteCart,
  putInCart,
  createOrder,
};
