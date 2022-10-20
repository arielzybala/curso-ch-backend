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

const getAllProductsAsAdmin = async (req, res, next) => {
  const data = await service.bringsAllProducts();
  res.status(200).render("stockView", { inventory: data })
}

const formAddOneProduct = async (req, res, next) => {
  res.status(200).render("formAddProduct")
}

const addOneProduct = async (req, res, next) => {
  await service.saveProduct(req.body, req.file.filename);
  res
    .status(201)
    .redirect("/api/products");
};

const formUpdateProduct = async (req, res, next) => {
  const data = await service.bringsProductById(req.params.id)
  res.status(200).render("formUpdateProduct", {data: data})
}

const updateOneProduct = async (req, res, next) => {
  await service.updateProduct(req.body, req.file.filename, req.params.id);
  res
    .status(202)
    .redirect("/api/products");
};

const deleteOneProduct = async (req, res, next) => {
  await service.deleteProduct(req.params.id);
  res.status(204).redirect("/api/orders");
};

module.exports = {
  getAllProducts,
  getAllProductsAsAdmin,
  getProductDetail,
  formAddOneProduct,
  formUpdateProduct,
  addOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
