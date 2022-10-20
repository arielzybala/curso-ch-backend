const { CartService } = require("../services/cartServices");
const { OrderService } = require("../services/ordersService");
const service = new OrderService();
const serviceCart = new CartService();

const getAllOrders = async (_req, res, _next) => {
  const data = await service.bringsAllOrders();
  if (!data) {
    return res.status(504);
  }
  res.status(200).render("ordersView", { data });
};

const getOrderById = async (req, res, _next) => {
  const data = await service.bringsOrderById(req.params.id);
  if (!data) {
    return res.status(504);
  }
  res.status(200).json({ msg: data });
};

const createOneOrder = async (req, res, _next) => {
  if (!req.cookies.jwt) {
    return res
      .status(401)
      .render("error", { message: "No tiene una sesión iniciada" });
  }
  await service.createOrder(req.cookies.cart.id, req.cookies.jwt);
  let cart = await serviceCart.createCart();
  res
    .status(201)
    .cookie("cart", cart, { maxAge: 3600 * 1000 })
    .json({ msg: "ok" });
};

const getUpdateOrder = async (req, res, _next) => {
  const data = await service.bringsOrderById(req.params.id);
  if (!data) {
    return res.status(504);
  }
  res.status(200).render("orderDetail", { data });
};

const updateOneOrder = async (req, res, _next) => {
  const order = await service.bringsOrderById(req.params.id);
  if (!order) {
    return res.status(504);
  }
  await service.updateOrder(req.body, order.items, req.params.id);
  res.redirect("/api/orders");
};

const deleteOneOrder = async (req, res, _next) => {
  await service.deleteOrder(req.params.id);
  res.status(204).json(`La Orden con id: ${req.params.id}, fue eliminada`);
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOneOrder,
  getUpdateOrder,
  updateOneOrder,
  deleteOneOrder,
};
