const KoaRouter = require("koa-router");
const controller = require("../controllers/productsControllers");
const { haveCartAlredy } = require("./middleware/checkCart");
const productRouter = new KoaRouter();

productRouter.get('/api/products', haveCartAlredy, controller.getAllProducts);

productRouter.get("/api/products/:id", controller.getProductDetail);

productRouter.post("/api/products", controller.addOneProduct);

productRouter.put("/api/products", controller.updateOneProduct);

productRouter.delete("/api/products/:id", controller.deleteOneProduct);

module.exports = productRouter;