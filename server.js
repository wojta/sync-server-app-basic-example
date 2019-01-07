const express = require('express')

const { ApolloVoyagerServer, gql } = require('@aerogear/apollo-voyager-server')

// This is our Schema Definition Language (SDL)
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Resolver functions. This is our business logic
const resolvers = {
  Query: {
    hello: (obj, args, context, info) => {
      
      // we can access the request object provided by the Voyager framework
      console.log(context.request.body)
      
      // we can access the context added below also
      console.log(context.serverName)
      return `Hello world from ${context.serverName}`
    }
  }
}

// The context is a function or object that can add some extra data
// That will be available via the `context` argument the resolver functions
const context = ({ req }) => {
  return {
    serverName: 'Voyager Server'
  }
}

// Initialize the apollo voyager server with our schema and context
const server = ApolloVoyagerServer({
  typeDefs,
  resolvers,
  context
})

const app = express()
server.applyMiddleware({ app })

const port = 4000
app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
)