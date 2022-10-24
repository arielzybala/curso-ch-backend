const { ProductService } = require("../services/productsService");
const service = new ProductService();

const getAllProducts = async (req, res, next) => {
  const data = await service.bringsAllProducts();
  res.status(200).render("products", { products: data });
};

const getCategoryProducts = async(req, res, next) =>{
  const data = await service.bringsProductByCategory(req.query.category);
  res.status(200).render("productsCategory", { products: data });
}

const getProductDetail = async (req, res, next) => {
  try {
    const data = await service.bringsProductById(req.params.id)
    res.status(200).render("productDetail", { product: data });
    
  } catch (error) {
    
    res.status(404).render("noStock", {message: "El producto ya no se encuentra disponible"})
  }
  
  
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
    .redirect("/api/products/admin/inventory");
};

const formUpdateProduct = async (req, res, next) => {
  const data = await service.bringsProductById(req.params.id)
  res.status(200).render("formUpdateProduct", {data: data})
}

const updateOneProduct = async (req, res, next) => {
  await service.updateProduct(req.body, req.file.filename, req.params.id);
  res
    .status(202)
    .redirect("/api/products/admin/inventory");
};

const deleteOneProduct = async (req, res, next) => {
  await service.deleteProduct(req.params.id);
  res.status(204).redirect("/api/orders");
};

module.exports = {
  getAllProducts,
  getCategoryProducts,
  getAllProductsAsAdmin,
  getProductDetail,
  formAddOneProduct,
  formUpdateProduct,
  addOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
