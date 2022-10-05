const { ProductService } = require("../resolvers/products");
const products = new ProductService();
const CartDao = require("../dao/cartMongo");
const cartDao = new CartDao();

class CartService {
  constructor() {
    this.dao = cartDao;
  }

  async bringsAllCarts() {
    const result = await cartDao.listAll();
    result.map((c) => [c.id, c.products]);
    return result;
  }

  async bringsCartById({ id }) {
    return await cartDao.listById(id);
  }

  async createCart() {
    let products = {};
    await cartDao.save(products);
    const result = await cartDao.listAll();
    result.map((c) => [c.id, c.products]);
    return result;
  }

  async AddProductToCart(args) {
    let product = await products.bringsProductById(args.idProduct);
    let cart = await cartDao.listById(args.id);
    cart.products.push(product);
    return await cartDao.update(cart);
  }

  async deleteCart(args) {
    await cartDao.deleteById(args.id);
    const result = await cartDao.listAll();
    result.map((c) => [c.id, c.products]);
    return result;
  }

  async deleteProductFromCart(args) {
    let cart = await cartDao.listById(args.id);
    let array = cart.products.filter((e) => e.id != args.idProduct);
    cart.products = array;
    return await cartDao.update(cart);
  }
}

module.exports = {
  CartService,
};
