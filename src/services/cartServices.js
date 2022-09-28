const { cartDao, productsDao, usersDao } = require("../dao/index");
const { checkTokenJwt } = require("../routes/middleware/jsonWebToken");
const { logger } = require("../utils/logger");
const { handleEmail } = require("../utils/nodemailer");
const orderAmount = require("../utils/orderAmount");
const sendMessage = require("../utils/twilio");
const checkIdandPrice = require("../utils/validateDataCookie");

class CartService {
  constructor() {
    this.dao = cartDao;
  }

  async bringCartSummary(id) {
    const data = await cartDao.listById(id);
    const total = await orderAmount(data);
    return { data: data, total: total };
  }

  async bringsProductById(id) {
    return await cartDao.listById(id);
  }
  async saveInCart(idProduct, amount, idCart) {
    let product = await productsDao.listById(idProduct);
    product.quantity = amount;

    let cart = await cartDao.listById(idCart);
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
      return await cartDao.update(cart);
    } else {
      const duplicated = cart.products.filter((e) => e.id == idProduct);
      preOrder = product;
      preOrder.quantity =
        Number(duplicated[0].quantity) + Number(product.quantity);
      const index = cart.products.findIndex((e) => e.id === preOrder.id);
      cart.products[index] = preOrder;
      return await cartDao.update(cart);
    }
  }

  async updateProduct(product) {
    return await cartDao.update(product);
  }

  async deleteProduct(id) {
    return await cartDao.deleteById(id);
  }

  async purchaseOrder(cartId, tokenUser) {
    if (!tokenUser || tokenUser == undefined) {
      return logger.error("El token no es válido");
    }
    const token = await checkTokenJwt(tokenUser);
    const user = await usersDao.listById(token.id);
    const cart = await cartDao.listById(cartId);
    const products = await productsDao.listAll();
    //Para controlar que lo que llega del front esta ok
    const DataFromFrontTest = await checkIdandPrice(products, cart.products);
    if (!DataFromFrontTest) {
      handleEmail(
        user,
        process.env.USERNM,
        "Se ingresaron datos distintos a los de la base de datos por este usuario"
      );
    }
    const totalToPay = await orderAmount(cart);
    const listOfOrder = cart.products.map((e) => [
      { Producto: e.title, Precio: `$ ${e.price}`, Cantidad: e.quantity },
    ]);
    listOfOrder.push(`Total a Pagar: $ ${totalToPay}`);
    //correo al usuario
    await handleEmail(
      listOfOrder,
      user.email,
      "Productos que ha ingresado en su orden de compras"
    );
    //mensaje de whapps
    const phone = (user.codesCountry + user.phone).toString();
    await sendMessage(phone, listOfOrder);
  }
}

module.exports = {
  CartService,
};
