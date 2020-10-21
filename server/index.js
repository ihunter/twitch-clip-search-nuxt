require('dotenv').config()
const express = require('express')
const throng = require('throng')
const cors = require('cors')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')

const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const graphqlSchema = require('./graphql/schema')
const graphqlResolvers = require('./graphql/resolvers')

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Mongoose
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
  } catch (error) {
    consola.error(error)
  }

  app.use(cors())

  // GraphQL
  app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: process.env.NODE_ENV !== 'production'
  }))

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Start workers
  if (process.env.NODE_ENV === 'production') {
    require('./workers')
  }

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
throng(start)
  .catch(err => console.log(err))
