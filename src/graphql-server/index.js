require('dotenv').config()
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(Promise);
const s3 = new AWS.S3();
const bucket = process.env.BUCKET_NAME;
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const { resolvers, worldGame } = require('../../src');
let db = [];

const startServer = async () => {
  const getJson = async () => {
    const allAroundTheWorld = await worldGame()
    allAroundTheWorld.map(async world => {
      let awaitingList = async () => {
        let params = {
          Bucket: bucket,
          Key: `${world.title}.json`,
        };
        let { Body } = await s3.getObject(params).promise();
        let list = await JSON.parse(Buffer.from(Body).toString("utf8"));
        return list;
      }
      await awaitingList()
        .then(res => {
          db.push(res);
          // console.log(db);
        })
        .catch(err => new Error(`Error scraping: ${JSON.stringify(err)}`))
    })
  };

  let response = await getJson();

  response
  .then(() => console.log('3', db))
  .then(() => {
    const server = new GraphQLServer({
      typeDefs: './src/graphql-server/schema.graphql', //This is schema for GraphQL API
      resolvers,
      context(req) {
        return {
          ...req,
          db,
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
  })
};

//   await getJson()
//     .then(() => console.log('3', db))
//     .then(() => {
//       const server = new GraphQLServer({
//         typeDefs: './src/graphql-server/schema.graphql', //This is schema for GraphQL API
//         resolvers,
//         context(req) {
//           return {
//             ...req,
//             db,
//             prisma: new Prisma({
//               typeDefs: './src/graphql-server/generated/prisma.graphql', //This is schema for Prisma-binding between GraphQL API & Prisma API.
//               endpoint: 'https://us1.prisma.sh/public-purplecentaur-310/prisma-graphql/dev', //This is Prisma API (same endpoint in prisma.yml)
//               debug: true,
//             }),
//           }
//         },
//       });

//       server.start({ port: process.env.PORT || 4000 }, () => {
//         console.log('The server is running at port 4000!')
//       })
//     })
// };

startServer();