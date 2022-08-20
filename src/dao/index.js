const PERSISTENCE = process.env.PERSISTENCE || "mongo";
let MessagesDao;
let productsDao;
let cartDao;

switch (PERSISTENCE) {
  case "mongo":
    const ProductsDaoMongo = require("./products/productsMongo");
    const CartDaoMongo = require("./cart/cartMongo");
    const MessagesDaoMongo = require("./messages/messagesMongo");
    MessagesDao = new MessagesDaoMongo();
    productsDao = new ProductsDaoMongo();
    cartDao = new CartDaoMongo();
    break;
  case "firebase":
    const ProductsDaoFirestore = require("./products/productsFirestore");
    const CartDaoFirestore = require("./cart/cartFirestore");
    const MessagesDaoFirestore = require("./messages/messagesFirestore");
    MessagesDao = new MessagesDaoFirestore();
    productsDao = new ProductsDaoFirestore();
    cartDao = new CartDaoFirestore();
    break;
  case "fileSystem":
    const ProductsDaoFs = require("./products/productsFs");
    const CartDaoFs = require("./cart/cartFs");
    const MessagesDaoFs = require("./messages/messagesFs");
    MessagesDao = new MessagesDaoFs();
    productsDao = new ProductsDaoFs();
    cartDao = new CartDaoFs();
    break;

  default:
    const ProductsDaoMemory = require("./products/productsMemory");
    const CartDaoMemory = require("./cart/cartMemory");
    productsDao = new ProductsDaoMemory();
    cartDao = new CartDaoMemory();
    break;
}

module.exports = { MessagesDao, productsDao, cartDao };
