const express = require("express");
const app = express();
const PORT = 8080;
const mainRouter = require("./src/routes/main");
const graphqlRouterProducts = require("./src/routes/routerProduct");
const graphqlRouterCarts = require("./src/routes/routerCart");
const db = require("./src/models/schemaMongo.js")

app.use("/api", graphqlRouterProducts , graphqlRouterCarts);
app.use("/", mainRouter);

app.listen(PORT, (err) => {
  !err ? console.log("Server Run") : console.log("Error Server Fail");
});
