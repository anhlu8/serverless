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
    typeDefs: path.join(__dirname, './schema.graphql'),
    resolvers,
    context(req) { 
      return {
        ...req,
        db,
        prisma: new Prisma({
          typeDefs: path.join(__dirname, './generated/prisma.graphql'),
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