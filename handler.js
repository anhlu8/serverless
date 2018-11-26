'use strict';
require('dotenv').config()
const {
  getFile,
  saveToS3,
  resolvers
} = require('./src');

const { GraphQLServerLambda } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const path = require('path');

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
AWS.config.setPromisesDependency(Promise);
const bucket = process.env.BUCKET_NAME;
const {ungzip} = require('node-gzip');
//const urls = [] => this will need to be populated.
const name = ['alliances', 'players', 'habitats']
const worldGame = []

for (let i = 0; i < urls.length; i++) {
  name.map(e => {
    if (urls[i].match(e)) {
      const world = {
        'title': `${Date.now()}-209-${e}`,
        'url': urls[i]
      };
      worldGame.push(world);
    }
  })
}

module.exports.launch = async (event, context) => {
  for (let i = 0; i < worldGame.length; i++) {
    await getFile(worldGame[i])
      .then(async res => {
        const buffering = await res.body.buffer()
        const buffered = await {
          'title': res.title,
          'body': buffering
        }
        return buffered;
      })
      .then(res => saveToS3(res))
      .then(() => {
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Your function executed successfully!',
          })
        };
      })
      .catch(err => new Error(`Error scraping: ${JSON.stringify(err)}`))
  }

};

module.exports.deserialize = async (event, context) => {
    console.log('message',event.Records[0])
    let {body} = event.Records[0]
      const params = {
          Bucket: bucket,
          Key: body,
      }
      console.log('1', params)
      let {Body} = await s3.getObject(params).promise();
      
      console.log('2', Body);
      let decompressed = await ungzip(Body);
      
      const asString = decompressed.toString();
      console.log('3', asString);
      const sentparams = {
          Bucket: bucket,
          Key: `${body}.json`,
          Body: asString
      }
      let data = await s3.putObject(sentparams).promise();
      return console.log("Success", data);
}

const lambda = new GraphQLServerLambda({
  typeDefs: path.join(__dirname, 'src/graphql-server/generated/prisma.graphql'),
  resolvers,
  context: req => ({
      ...req,
      db: new Prisma({
          endpoint: 'https://us1.prisma.sh/public-purplecentaur-310/prisma-graphql/dev',
          debug: true, 
      }),
  }),
});

exports.server = lambda.graphqlHandler
exports.playground = lambda.playgroundHandler





