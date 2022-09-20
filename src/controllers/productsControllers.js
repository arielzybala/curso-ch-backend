const { productsDao } = require("../dao/index");

const getAllProducts = async (req, res, next) => {
  const data = await productsDao.listAll();
  res.status(200).render("products", { products: data });
};

const getProductDetail = async (req, res, next) => {
  const data = await productsDao.listById(req.params.id);
  res.render("productDetail", { product: data });
};

const addOneProduct = async (req, res, next) => {
  await productsDao.save(req.body);
  res.status(201).json("ok");
};

const updateOneProduct = async (req, res, next) => {
  const updateProduct = await productsDao.update(req.body);
  res.status(202).json(updateProduct);
};

const deleteOneProduct = async (req, res, next) => {
  await productsDao.deleteById(req.params.id);
  res.status(204);
};

module.exports = {
  getAllProducts,
  getProductDetail,
  addOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
