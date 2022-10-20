const { cartDao, productsDao, ordersDao} = require("../dao/index");
const { checkTokenJwt } = require("../routes/middleware/jsonWebToken");
const orderAmount = require("../utils/orderAmount");


class CartService {
  constructor() {
    this.dao = cartDao;
  }
  
  async bringCartSummary(id, token) {
    const tokenUser = await checkTokenJwt(token);
    const orders = await ordersDao.listAll()
    const oldOrders = orders.filter((e)=> e.userId == tokenUser.id);
    console.log(oldOrders)
    const data = await this.dao.listById(id);
    const total = await orderAmount(data);
    return { data: data, total: total , orders: oldOrders};
  }

  async bringsProductById(id) {
    return await this.dao.listById(id);
  }

  async createCart(){
    return await this.dao.save()
  }

  async saveInCart(idProduct, amount, idCart) {
    let product = await productsDao.listById(idProduct);
    product.quantity = amount;

    let cart = await this.dao.listById(idCart);
    let preOrder;
    let repeat = cart.products.some((e) => e.id === idProduct);

    /*
    * Para entender el IF dentro 
    -> duplicated = Filtra en busqueda de repeticiones.
    1er Resultado Sin repeticiones -> retorna el nuevo producto pusheado dentro de cart para hacer un update del carrito en la db
    2do Resultado Con repeticiones -> Entra en juego la variable
    "preOrder" 
    (1°) preOrder, recibe el valor del producto elegido 
    (2°) suma las cantidades seleccionadas producto anterior, y el nuevo seleccionado. 
    (3°) luego se busca el index del producto repetido. 
    (4°) se pisa el anterior con los valores actualizados
    (5°) Se solicita el update del carrito   
    */
    if (!repeat) {
      cart.products.push(product);
      return await this.dao.update(cart);
    } else {
      const duplicated = cart.products.filter((e) => e.id == idProduct);
      preOrder = product;
      preOrder.quantity =
        Number(duplicated[0].quantity) + Number(product.quantity);
      const index = cart.products.findIndex((e) => e.id === preOrder.id);
      cart.products[index] = preOrder;
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
