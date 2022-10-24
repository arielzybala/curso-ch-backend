const orderAmount = require("../utils/orderAmount");
const checkIdandPrice = require("../utils/validateDataCookie")
const { ordersDao, usersDao, cartDao, productsDao } = require("../dao/index");
const { checkTokenJwt } = require("../routes/middleware/jsonWebToken");
const { handleEmail } = require("../utils/nodemailer");


class OrderService {
  constructor() {
    this.dao = ordersDao;
  }

  async bringsAllOrders() {
    return await this.dao.listAll();
  }

  async bringsOrderById(id) {
    return await this.dao.listById(id);
  }

  async createOrder(cartId, tokenUser) {

    const token = await checkTokenJwt(tokenUser);/* La función recibe el token 
    y de manera segura lo vuelve legible, para luego tomar la data y conectar con la db
    */
    const user = await usersDao.listById(token.id);
    const cart = await cartDao.listById(cartId);
    const products = await productsDao.listAll();

    /*
    CheckIdandPrice, cruza datos para ver que no se contradigan con los existentes
    */
    const DataFromFrontTest = await checkIdandPrice(products, cart.products);
    if (!DataFromFrontTest) {
      handleEmail(
        user,
        process.env.USERNM,
        "Se ingresaron datos distintos a los de la base de datos por este usuario"
      );
    }
    /*
    orderAmount multiplica precio por cantidad de unidades en cada producto, los suma y devuelve el total a pagar
    */
    const totalToPay = await orderAmount(cart);

    const dataOfOrders = await this.dao.listAll();
    
    const numberOfOrders = dataOfOrders.length + 1;//Cara darle un "numero de orden de compra"

    const listOfOrder = cart.products.map((e) => [
      { Producto: e.title, Precio: `$ ${e.price}`, Cantidad: e.quantity },
    ]);
    listOfOrder.push(`Total a Pagar: $ ${totalToPay}`);
    

    //Correo al usuario con la orden creada
    await handleEmail(
      listOfOrder,
      process.env.USERNM,
      "Productos que ha ingresado en su orden de compras"
    );

    return await this.dao.save({ //Guarda la orden.
      userId: user.id,
      email: user.email,
      address: user.address,
      orderNumber: numberOfOrders,
      items: cart.products,
      state: "generada",
    });
  }

  async updateOrder(order, items, id) {
    order.id = id;
    order.items = items;
    return await this.dao.update(order);
  }

  async deleteOrder(id) {
    return await this.dao.deleteById(id);
  }
}

module.exports = {
  OrderService,
};
