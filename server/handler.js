'use strict';
require('dotenv').config()
const {
  getFile,
  saveToS3,
  worldGame
} = require('./utils/index');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
AWS.config.setPromisesDependency(Promise);
const bucket = process.env.BUCKET_NAME;
const { ungzip } = require('node-gzip');

module.exports.launch = async (event, context) => {
  const allAroundTheWorld = await worldGame()
  for (let i = 0; i < allAroundTheWorld.length; i++) {
    await getFile(allAroundTheWorld[i])
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
  let { body } = event.Records[0]
  let title = `${body}.json`;
  const params = {
    Bucket: bucket,
    Key: body,
  }
  let { Body } = await s3.getObject(params).promise();
  let decompressed = await ungzip(Body);

  const asString = decompressed.toString();
  const sentparams = {
    Bucket: bucket,
    Key: title,
    Body: asString,
  }
  await s3.putObject(sentparams).promise()
    .catch(err => new Error(`Error scraping: ${JSON.stringify(err)}`))

};




