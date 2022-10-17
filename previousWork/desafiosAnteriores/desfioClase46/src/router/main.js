const KoaRouter = require("koa-router");
const { getRoot } = require("../controllers/mainController");
const mainRouter = new KoaRouter();

mainRouter.get('/', getRoot);

module.exports = mainRouter;
