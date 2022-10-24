const { cartDao, productsDao, ordersDao } = require("../dao/index");
const { checkTokenJwt } = require("../routes/middleware/jsonWebToken");
const orderAmount = require("../utils/orderAmount");

class CartService {
  constructor() {
    this.dao = cartDao;
  }

  async bringCartSummary(id, token) {
    const tokenUser = await checkTokenJwt(token); //Verifica validez y blanquea el token

    const orders = await ordersDao.listAll();

    const oldOrders = orders.filter((e) => e.userId == tokenUser.id);

    const data = await this.dao.listById(id);

    const total = await orderAmount(data); //Multiplica precio por cantidad de cada producto y devuelve el total a pagar
    return { data: data, total: total, orders: oldOrders };
  }

  async bringCartById(id) {
    return await this.dao.listById(id);
  }

  /*
  EXPLICACIÓN: Recibe id de carrito e id de producto y lo actualiza sin el producto.
  */
  async removeProduct(id, idProduct) {
    const cart = await this.dao.listById(id);
    
    const cartCleaned = cart.products.filter((e) => e.id != idProduct);
    
    cart.products = cartCleaned;
    
    return await this.dao.update(cart); 
  }

  async bringsProductById(id) {
    return await this.dao.listById(id);
  }

  async createCart() {
    return await this.dao.save();
  }

  async saveInCart(idProduct, amount, idCart) {
    let product = await productsDao.listById(idProduct);
    product.quantity = amount;

    let cart = await this.dao.listById(idCart);
    let preOrder;
    let repeat = cart.products.some((e) => e.id === idProduct);

    /*
    EXPLICACIÓN: Este "if" evitar que se repita un producto en la lista de orden de compra
    */
    if (!repeat) {
      cart.products.push(product);
      return await this.dao.update(cart);
    } else {
      //Filtra en busqueda de repeticiones.
      const duplicated = cart.products.filter((e) => e.id == idProduct);
      //(1°) preOrder, recibe el valor del producto elegido
      preOrder = product;
      //(2°) suma las cantidades seleccionadas producto anterior, y el nuevo seleccionado.
      preOrder.quantity =
        Number(duplicated[0].quantity) + Number(product.quantity);
      //(3°) luego se busca el index del producto repetido.
      const index = cart.products.findIndex((e) => e.id === preOrder.id);
      //(4°) se pisa el anterior con los valores actualizados
      cart.products[index] = preOrder;
      //(5°) Se solicita el update del carrito
      return await this.dao.update(cart);
    }
  }

  async updateProduct(product) {
    return await this.dao.update(product);
  }

  async deleteProduct(id) {
    return await this.dao.deleteById(id);
  }
}

module.exports = {
  CartService,
};
