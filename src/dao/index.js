const PERSISTENCE = process.env.PERSISTENCE || "firebase";
let productsDao;
let cartDao;
let usersDao;
let messagesDao;

switch (PERSISTENCE) {
  case "mongo":
    const ProductsDaoMongo = require("./products/productsMongo");
    const CartDaoMongo = require("./cart/cartMongo");
    const UsersDaoMongo = require("./users/usersMongo");
    const MessagesDaoMongo = require("./messages/messagesMongo");
    messagesDao = new MessagesDaoMongo();
    usersDao = new UsersDaoMongo();
    productsDao = new ProductsDaoMongo();
    cartDao = new CartDaoMongo();
    break;
  case "firebase":
    const ProductsDaoFirestore = require("./products/productsFirestore");
    const CartDaoFirestore = require("./cart/cartFirestore");
    const UsersDaoFirestore = require("./users/usersFirestore");
    const MessagesDaoFirestore = require("./messages/messagesFirestore");
    messagesDao = new MessagesDaoFirestore();
    usersDao = new UsersDaoFirestore();
    productsDao = new ProductsDaoFirestore();
    cartDao = new CartDaoFirestore();
    break;
  case "fileSystem":
    const ProductsDaoFs = require("./products/productsFs");
    const CartDaoFs = require("./cart/cartFs");
    const UsersDaoFs = require("./users/usersFs");
    const MessagesDaoFs = require("./messages/messagesFs");
    messagesDao = new MessagesDaoFs();
    usersDao = new UsersDaoFs();
    productsDao = new ProductsDaoFs();
    cartDao = new CartDaoFs();
    break;

  default:
    const ProductsDaoMemory = require("./products/productsMemory");
    const CartDaoMemory = require("./cart/cartMemory");
    const UsersDaoMemory = require("./users/usersMemory");
    usersDao = new UsersDaoMemory();
    productsDao = new ProductsDaoMemory();
    cartDao = new CartDaoMemory();
    break;
}

module.exports = { productsDao, cartDao, usersDao, messagesDao };
