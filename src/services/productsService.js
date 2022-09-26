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

  async saveProduct(product) {
    return await productsDao.save(product);
  }

  async updateProduct(product) {
    return await productsDao.update(product);
  }

  async deleteProduct(id) {
    return await productsDao.deleteById(id);
  }
}

module.exports = {
  ProductService,
};
