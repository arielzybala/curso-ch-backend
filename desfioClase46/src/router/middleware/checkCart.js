
const { cartDao } = require("../../dao");


const haveCartAlredy = async (ctx, next) => {
  if (await ctx.cookies.get("cart")) {
   await next();
  } else {
     const data = await cartDao.save();
    const cart = {id: data.id, products: data.products} 
    await ctx.cookies.set("cart", JSON.stringify(cart), {
      httpOnly: true,
      maxAge: 3600 * 1000,
      overwrite: true
    });
    await next();
  }
};

module.exports = { haveCartAlredy };
