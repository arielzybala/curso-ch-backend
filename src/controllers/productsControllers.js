const { ProductService } = require("../services/productsService");
const service = new ProductService();

const getAllProducts = async (req, res, next) => {
  const data = await service.bringsAllProducts();
  res.status(200).render("products", { products: data });
};

const getProductDetail = async (req, res, next) => {
  const data = await service.bringsProductById(req.params.id);
  res.status(200).render("productDetail", { product: data });
};

const addOneProduct = async (req, res, next) => {
  const data = await service.saveProduct(req.body);
  res
    .status(201)
    .json(`Se guardaron los siguientes datos como producto ${data}`);
};

const updateOneProduct = async (req, res, next) => {
  const data = await service.updateProduct(req.body);
  res
    .status(202)
    .json(`Se guardaron los siguientes datos como producto ${data}`);
};

const deleteOneProduct = async (req, res, next) => {
  await service.deleteProduct(req.params.id);
  res.status(204).json(`El producto con id: ${req.params.id}, fue eliminado`);
};

module.exports = {
  getAllProducts,
  getProductDetail,
  addOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
