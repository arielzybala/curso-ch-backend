const { ProductService } = require("../services/productsServices");
const service = new ProductService();

const getAllProducts = async (ctx) => {
  const data = await service.bringsAllProducts();
  await ctx.render("products", { products: data });
};

const getProductDetail = async (ctx) => {
  const product = ctx.request.params
  const data = await service.bringsProductById(product.id);
  await ctx.render("productDetail", { product: data });
};

const addOneProduct = async (ctx) => {
  const data = await service.saveProduct(ctx.request.body);
  await ctx.render('assert', {msg:`Has agregado el producto ${data.title}, a la base de datos.`});
};

const updateOneProduct = async (ctx) => {
  const data = await service.updateProduct(ctx.request.body);
  await ctx.render('assert', {msg:`El producto con id: ${ctx.request.body.id} , fue actualizado.`});
};

const deleteOneProduct = async (ctx) => {
  const id = ctx.request.params
  await service.deleteProduct(id.id);
  await ctx.render('assert', {msg: `El producto con id: ${id.id}, fue eliminado`});
};

module.exports = {
  getAllProducts,
  getProductDetail,
  addOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
