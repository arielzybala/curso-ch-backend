const { CartService } = require("../services/cartServices");
const service = new CartService();

const getAll = async (req, res, next) => {
  const cart = await service.bringCartSummary(req.cookies.cart.id, req.cookies.jwt);
  res.render("cartView", {
    cart: cart.data.products,
    total: cart.total,
    id: cart.data.id,
    dataOrders: cart.orders
  });
};

const putInCart = async (req, res, _next) => {
  await service.saveInCart(
      Number(req.body.idProduct),
      req.body.quantity,
      req.cookies.cart.id
    );
    res.status(206)
};

const deleteCart = async (req, res, next) => {
  await service.deleteProduct(req.params.id);
};



module.exports = {
  getAll,
  deleteCart,
  putInCart,
};
