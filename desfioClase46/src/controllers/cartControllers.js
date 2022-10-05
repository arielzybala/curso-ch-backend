const { CartService } = require("../services/cartServices");
const service = new CartService();

const getAll = async (ctx) => {
  const cookieData = ctx.cookies.get("cart");
  const cookieParsed = JSON.parse(cookieData);
  const cart = await service.bringCartSummary(cookieParsed.id);
  await ctx.render("cartView", {
    cart: cart.data.products,
    total: cart.total,
    id: cart.data.id,
  });
};

const putInCart = async (ctx) => {
  const cookieData = ctx.cookies.get("cart");
  const cookieParsed = JSON.parse(cookieData);

  await service.saveInCart(
    Number(ctx.request.body.idProduct),
    ctx.request.body.quantity,
    cookieParsed.id
  );
};

const deleteCart = async (ctx) => {
  const cart = ctx.request.params
  console.log(cart.id)
  await service.deleteCompleteCart(cart.id);
};


module.exports = {
  getAll,
  deleteCart,
  putInCart,

};
