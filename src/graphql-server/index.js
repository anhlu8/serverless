require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const { resolvers, jsonArrs } = require('../../src');

const startServer = async () => {
  let db = await jsonArrs();
  // console.log('3', db)
  const server = new GraphQLServer({
    typeDefs: './src/graphql-server/schema.graphql', //This is schema for GraphQL API
    resolvers,
    context(req) { //context is an object with a set of properties (will get passed to every single resolver, regarless of where the resolver is defined) we can set upfor our Prisma api
      return {
        ...req,
        db, //this db is data from json files which are stored in S3
        prisma: new Prisma({
          typeDefs: './src/graphql-server/generated/prisma.graphql', //This is schema for Prisma-binding between GraphQL API & Prisma API.
          endpoint: 'https://us1.prisma.sh/public-purplecentaur-310/prisma-graphql/dev', //This is Prisma API (same endpoint in prisma.yml)
          debug: true,
        }),
      }
    },
  });

  server.start({ port: process.env.PORT || 4000 }, () => {
    console.log('The server is running at port 4000!')
  })

};

startServer();