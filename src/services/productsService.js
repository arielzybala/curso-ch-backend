const { productsDao } = require("../dao/index");

class ProductService {
  constructor() {
    this.dao = productsDao;
  }

  async bringsAllProducts() {
    return await productsDao.listAll();
  }

  async bringsProductById(id) {
    return await productsDao.listById(id);
  }

  async saveProduct(product, file) {
    product.thumbnail = file
    return await productsDao.save(product);
  }

  async updateProduct(product, file, id) {
    product.thumbnail = file;
    product.id = id;
    return await productsDao.update(product);
  }

  async deleteProduct(id) {
    return await productsDao.deleteById(id);
  }
}

module.exports = {
  ProductService,
};
