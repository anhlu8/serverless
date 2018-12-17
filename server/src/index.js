require('dotenv').config()
const mysql = require("mysql");
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const { jsonArrs } = require('../utils/index');
const { resolvers } = require("./resolvers");


const arrayToObject = (arr, keyField) =>
    Object.assign({}, ...arr.map(item => ({ [item[keyField]]: item })));

const getDB = async () => {
    let promise = await jsonArrs();
    let db = await arrayToObject(promise, "title")
    return db
};

const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB,
  dialect: "mysql"
});

connection.connect(function(err) {
  if (err) throw err;
  
  connection.end();
});



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
          endpoint: 'http://my-pr-Publi-1QWIS1O4GY0T0-1152267085.us-east-1.elb.amazonaws.com/redqueen/dev',
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