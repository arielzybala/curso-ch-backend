const KoaRouter = require("koa-router");
const cartRouter = new KoaRouter();
const controllers = require("../controllers/cartControllers");

cartRouter.get("/api/cart", controllers.getAll);

cartRouter.post("/api/cart/:id/add", controllers.putInCart);
/// a patir de acá se testea con postman ⤵️
cartRouter.delete("/api/cart/:id", controllers.deleteCart);

module.exports = cartRouter;
