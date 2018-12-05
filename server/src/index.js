require('dotenv').config()
const path = require('path');
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const { resolvers, jsonArrs } = require('../utils/index');

const arrayToObject = (arr, keyField) =>
    Object.assign({}, ...arr.map(item => ({ [item[keyField]]: item })));

const getDB = async () => {
    let promise = await jsonArrs();

    let db = await arrayToObject(promise, "title")
    return db;
};

const startServer = async () => {
  let db = await getDB();
  const server = new GraphQLServer({
    typeDefs: path.join(__dirname, './schema.graphql'), //This is schema for GraphQL API
   
    // typeDefs: './src/schema.graphql', 
    resolvers,
    context(req) { //context is an object with a set of properties (will get passed to every single resolver, regarless of where the resolver is defined) we can set upfor our Prisma api
      return {
        ...req,
        db, //this db is data from json files which are stored in S3
        prisma: new Prisma({
          // typeDefs: './src/generated/prisma.graphql', //This is schema for Prisma-binding between GraphQL API & Prisma API.
          typeDefs: path.join(__dirname, './generated/prisma.graphql'),
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