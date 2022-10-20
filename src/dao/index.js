const PERSISTENCE = process.env.PERSISTENCE || "mongo";
let productsDao;
let cartDao;
let usersDao;
let messagesDao;
let ordersDao;

switch (PERSISTENCE) {
  case "mongo":
    const ProductsDaoMongo = require("./products/productsMongo");
    const CartDaoMongo = require("./cart/cartMongo");
    const UsersDaoMongo = require("./users/usersMongo");
    const MessagesDaoMongo = require("./messages/messagesMongo");
    const OrdersDaoMongo = require("./orders/ordersMongo.js");
    messagesDao = new MessagesDaoMongo();
    usersDao = new UsersDaoMongo();
    productsDao = new ProductsDaoMongo();
    cartDao = new CartDaoMongo();
    ordersDao = new OrdersDaoMongo();
    break;
  case "firebase":
    const ProductsDaoFirestore = require("./products/productsFirestore");
    const CartDaoFirestore = require("./cart/cartFirestore");
    const UsersDaoFirestore = require("./users/usersFirestore");
    const MessagesDaoFirestore = require("./messages/messagesFirestore");
    const OrdersDaoFirestore = require("./orders/ordersFirestore.js");
    messagesDao = new MessagesDaoFirestore();
    usersDao = new UsersDaoFirestore();
    productsDao = new ProductsDaoFirestore();
    cartDao = new CartDaoFirestore();
    ordersDao = new OrdersDaoFirestore();
    break;
  case "fileSystem":
    const ProductsDaoFs = require("./products/productsFs");
    const CartDaoFs = require("./cart/cartFs");
    const UsersDaoFs = require("./users/usersFs");
    const MessagesDaoFs = require("./messages/messagesFs");
    const OrdersDaoFs = require("./orders/ordersFs.js");
    messagesDao = new MessagesDaoFs();
    usersDao = new UsersDaoFs();
    productsDao = new ProductsDaoFs();
    cartDao = new CartDaoFs();
    ordersDao = new OrdersDaoFs();
    break;

  default:
    const ProductsDaoMemory = require("./products/productsMemory");
    const CartDaoMemory = require("./cart/cartMemory");
    const UsersDaoMemory = require("./users/usersMemory");
    const OrdersDaoMemory = require("./orders/ordersMemory.js");
    usersDao = new UsersDaoMemory();
    productsDao = new ProductsDaoMemory();
    cartDao = new CartDaoMemory();
    ordersDao = new OrdersDaoMemory();
    break;
}

module.exports = { productsDao, cartDao, usersDao, messagesDao, ordersDao };
