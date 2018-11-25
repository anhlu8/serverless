//moving this file to handler.js at the root level
// require('dotenv').config()
// const { GraphQLServerLambda } = require('graphql-yoga');
// const { Prisma } = require('prisma-binding');
// const resolvers = require('./resolvers');
// const path = require('path');


// const options = {
//   cors: {
//     'origin': ['http://localhost:8080/'],
//     'methods': ['GET', 'HEAD', 'POST'],
//     'preflightContinue': false,
//     'optionsSuccessStatus': 200
//   }
// }


// const lambda = new GraphQLServerLambda({
//   typeDefs: path.join(__dirname, '/schema.graphql'),
//   resolvers,
//   context: req => ({
//       ...req,
//       db: new Prisma({
//           endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma DB service (value is set in .env)
//           secret: process.env.PRISMA_SECRET, // taken from database/prisma.yml (value is set in .env)
          // debug: true, // log all GraphQL queries & mutations
          // secret: 'mysecret123',                 // only needed if specified in `database/prisma.yml`
//       }),
//   }),
// })

// exports.server = lambda.graphqlHandler
// exports.playground = lambda.playgroundHandler
