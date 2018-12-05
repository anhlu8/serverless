require('dotenv').config()
const path = require('path');
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const { jsonArrs } = require('../utils/index');
const { resolvers } = require("./resolvers")

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
    typeDefs: './src/schema.graphql',
    resolvers,
    context: (req) => { 
      return {
        ...req,
        db,
        prisma: new Prisma({
          typeDefs: 'src/generated/prisma.graphql',
          endpoint: 'https://us1.prisma.sh/public-purplecentaur-310/prisma-graphql/dev',
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




// import { GraphQLServer, MockList } from 'graphql-yoga'

// const typeDefs = `
//   type Query {
//     hello(name: String): String!
//     listOfStrings: [String]
//   }
// `

// const mocks = {
//   Query: () => ({
//     hello: () => 'Hello World',
//     listOfStrings: () => new MockList([2, 6]),
//   }),
// }

// const server = new GraphQLServer({ typeDefs, resolvers: () => true, mocks })
// server.start()