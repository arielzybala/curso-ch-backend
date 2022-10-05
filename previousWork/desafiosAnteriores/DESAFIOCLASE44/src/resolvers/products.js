const ProductsDao = require("../dao/productsMongo");
const productsDao = new ProductsDao()

  class ProductService {
    constructor() {
      this.dao = productsDao;
    }
  
    async bringsAllProducts() {
      return await productsDao.listAll();
    }
  
    async bringsProductById({id}) {
      return await productsDao.listById(id);
    }
  
    async saveProduct(product) {
      return await productsDao.save(product);
    }
  
    async updateProduct(args) {
      console.log(args)
      const {id, title, price, text, thumbnail} = args.args
      let product = {id, title, price, text, thumbnail}
      console.log(product)
      return await productsDao.update(product);
    }
  
    async deleteProduct({id}) {
      await productsDao.deleteById(id);
      const result = await productsDao.listAll()
      return result.map((e)=> e)
    }
  }
  
  module.exports = {
    ProductService,
  };