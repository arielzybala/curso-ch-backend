const fs = require("fs");
const express = require("express");
const path = require("path");

const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { CartService } = require("../resolvers/carts");
const { Router } = express;
const carts = new CartService();

const schemaString = fs
  .readFileSync(path.join(__dirname, "../schemas/cart.gql"))
  .toString();
const schemaStructure = buildSchema(schemaString);

const graphMidd = graphqlHTTP({
  schema: schemaStructure,
  rootValue: {
    bringsAllCarts: carts.bringsAllCarts,
    bringsCartById: carts.bringsCartById,
    createCart: carts.createCart,
    deleteCart: carts.deleteCart,
    AddProductToCart: carts.AddProductToCart,
    deleteProductFromCart: carts.deleteProductFromCart,
  },
  graphiql: true,
});

const graphqlRouterCarts = Router();

graphqlRouterCarts.use("/carts", graphMidd);

module.exports = graphqlRouterCarts;
