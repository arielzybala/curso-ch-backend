const fs = require("fs");
const express = require("express");
const path = require("path");

const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { ProductService } = require("../resolvers/products");
const { Router } = express;
const products = new ProductService();

const schemaString = fs
  .readFileSync(path.join(__dirname, "../schemas/products.gql"))
  .toString();
const schemaStructure = buildSchema(schemaString);

const graphMidd = graphqlHTTP({
  schema: schemaStructure,
  rootValue: {
    bringsAllProducts: products.bringsAllProducts,
    bringsProductById: products.bringsProductById,
    saveProduct: products.saveProduct,
    updateProduct: products.updateProduct,
    deleteProduct: products.deleteProduct,
  },
  graphiql: true,
});

const graphqlRouterProducts = Router();

graphqlRouterProducts.use("/products", graphMidd);

module.exports = graphqlRouterProducts;
