'use strict';
const {
  getFile,
  lamdaToSqs,
  saveToS3,
  unzipAndParse,
} = require('./src');

const AWS = require('aws-sdk');
const sqs = new AWS.SQS();
AWS.config.setPromisesDependency(Promise);
const awsAccountId = process.env.AWS_ACCOUNTID;
const sqsQueueName = process.env.SQS_QUEUE_NAME;
const awsRegion = process.env.MY_AWS_REGION;
const queueUrl = `https://sqs.${awsRegion}.amazonaws.com/${awsAccountId}/${sqsQueueName}`;
const bucket = process.env.BUCKET_NAME;
const zlib = require('zlib');
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(Promise);
const s3 = new AWS.S3();

const urls = ['http://public-data.lordsandknights.com/LKWorldServer-RE-US-1/alliances.json.gz', 'http://public-data.lordsandknights.com/LKWorldServer-RE-US-1/players.json.gz', 'http://public-data.lordsandknights.com/LKWorldServer-RE-US-1/habitats.json.gz'];
const name = ['alliances', 'players', 'habitats']
const worldGame = []

for (let i = 0; i < urls.length; i++) {
  const file = name.map(e => {
    if (urls[i].match(e)) {
      const world = {
        'title': `${Date.now()}-209-${e}`,
        'url': urls[i]
      };
      worldGame.push(world);
    }
  })
}

//This Lambda function will be triggered by cron, then fetch, download an unzip file and save it to S3.
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

//This Lambda function will be triggered by SQS message, then get the unzip file in S3, unzip it and parse it to JSON, and save the new file back to S3
module.exports.deserialize = async (event, context) => {
  await sqs.receiveMessage({
    QueueUrl: queueUrl,
    AttributeNames: ['All'],
    MaxNumberOfMessages: '10',
    VisibilityTimeout: '30',
    WaitTimeSeconds: '20'
  }).promise()
    .then(data => {
      data.Records.forEach(async record => {
        const { body } = record;
        const params = {
          Bucket: bucket,
          Key: body,
        }
        s3.getObject(params, async function (err, data) {
          if (err) {
            return console.log("Error in getObject", err)
          } else {
            const { Body } = data;
            const processUnzippedFile = async (err, decompressed) => {
              if (err) {
                console.log("Error in zlib.gunzip");
              }
              const asString = decompressed.toString();
              const sentparams = {
                Bucket: bucket,
                Key: `${event}.json`,
                Body: asString
              }
              s3.putObject(sentparams, function (err, data) {
                if (err) {
                  return console.log("Error in putObject", err)
                }
                return console.log("Success", data);
              });
            };

            zlib.gunzip(Body, processUnzippedFile);

          }
        })
      });
    })
};

module.exports.graphql = async (event, context) => { };

module.exports.playground = async (event, context) => { };