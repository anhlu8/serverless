require('dotenv').config()
const { GraphQLServerLambda } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const { jsonArrs } = require('../utils/index');
const { resolvers } = require("./resolvers");


const arrayToObject = (arr, keyField) =>
  Object.assign({}, ...arr.map(item => ({ [item[keyField]]: item })));

const getDB = async () => {
  let promise = await jsonArrs();
  let database = await arrayToObject(promise, "title")
  return database
};

module.exports.graphql = async (event, context) => {
  let db = await getDB();
  const lambda = new GraphQLServerLambda({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: (req) => {
      return {
        ...req,
        db,
        prisma: new Prisma({
          typeDefs: 'src/generated/prisma.graphql',
          endpoint: 'http://my-pr-Publi-1QWIS1O4GY0T0-1152267085.us-east-1.elb.amazonaws.com/redqueen/dev',
          debug: true,
        }),
      }
    },
});

exports.server = lambda.graphqlHandler
exports.playground = lambda.playgroundHandler
};