require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Nuxt, Builder } = require("nuxt");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");

const app = express();

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  await nuxt.ready();
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Mongoose
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error(error);
  }

  app.use(cors());

  // GraphQL
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlResolvers,
      graphiql: config.dev,
    })
  );

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  console.log(`Server listening on http://${host}:${port}`);
}

start().catch((err) => console.error(err));
