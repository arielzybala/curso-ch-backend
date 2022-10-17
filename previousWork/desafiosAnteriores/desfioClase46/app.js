const Koa = require("koa");
const koaBody = require("koa-body");
const json = require("koa-json");
const path = require("path");
const render = require("koa-ejs");
const app = new Koa();
const koaBodyParser = require("koa-bodyparser");
const static = require("koa-static");
const mainRouter = require("./src/router/main");
const productRouter = require("./src/router/productsRoutes");
const cartRouter = require("./src/router/cartRouter");

app.use(json());
app.use(koaBody({ multipart: true }));
app.use(
  koaBodyParser({
    enableTypes: ["JSON"],
    jsonLimit: "2mb",
    onerror: (err, ctx) => {
      ctx.throw(`BODYPARSER ${err}`, 422);
    },
  })
  );
  
  render(app, {
    root: path.join(__dirname, "./src/views"),
    layout: false,
    viewExt: "ejs",
    cache: false,
    debug: false,
  });
  
  app.use(static(path.join(__dirname, "./public")));
  app.use(productRouter.routes()).use(productRouter.allowedMethods());
  app.use(cartRouter.routes()).use(cartRouter.allowedMethods());
  
  app.listen(3000, (err) => {
    err ? console.log("Server Fail") : console.log("Server Run Port 3000");
});

module.exports = { app };
