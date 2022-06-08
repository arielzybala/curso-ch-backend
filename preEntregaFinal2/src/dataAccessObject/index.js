let productsDao;
let cartsDao;

switch (process.env.PERCISTANCE) {
  case "json":
    const { ProductsDaoFile } = await require("./daosProducts/ProductsDaoFile.js");
    const { CartsDaoFile } = await require("./daosCarts/CartsDaoFile.js");

    productsDao = new ProductsDaoFile();
    cartsDao = new CartsDaoFile();
    break;
  case "firebase":
    const { ProductsDaoFirebase } =
      await require("./daosProducts/ProductsDaoFirebase.js");
    const { CartsDaoFirebase } =
      await require("./daosCarts/CartsDaoFirebase.js");

    productsDao = new ProductsDaoFirebase();
    cartsDao = new CartsDaoFirebase();
    break;
  case "mongodb":
    const { ProductsDaoMongoDb } =
      await require("./daosProducts/ProductsDaoMongoDb.js");
    const { CartsDaoMongoDb } = await require("./daosCarts/CartsDaoMongoDb.js");

    productsDao = new ProductsDaoMongoDb();
    cartsDao = new CartsDaoMongoDb();
    break;
  case "sqlite3":
    const { ProductsDaoSQLite3 } =
      await require("./daosProducts/ProductsDaoSQLite3.js");
    const { CartsDaoSQLite3 } = await require("./daosCarts/CartsDaoSQLite3.js");

    productsDao = new ProductsDaoSQLite3();
    cartsDao = new CartsDaoSQLite3();
    break;
  default:
    const { ProductsDaoMem } =
      await require("./daosProducts/ProductsDaoMem.js");
    const { CartsDaoMem } = await require("./daosCarts/CartsDaoMem.js");

    productsDao = new ProductsDaoMem();
    cartsDao = new CartsDaoMem();
    break;
}

module.exports = { productsDao, cartsDao };
