'use strict';
const {
  getFile,
  sqsToLambda,
  lamdaToSqs,
  saveToS3,
  getFromS3,
  unzipAndParse,
  jsonToCsv,
  s3ToMysql
} = require('./src');

//This Lambda function will be triggered by cron, then fetch, download an unzip file and save it to S3.
module.exports.launch = async (event, context) => {
  getFile()
    .then(res => res.buffer())
    .then(res => saveToS3(res))
    .then(res => lamdaToSqs())
    .then(() => {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Your function executed successfully!',
        })
      };
    })
    .catch(err => new Error(`Error scraping: ${JSON.stringify(err)}`))
};

//This Lambda function will be triggered by SQS message, then get the unzip file in S3, unzip it and parse it to JSON, and save the new file back to S3
module.exports.deserialize = async (event, context) => {
  unzipAndParse()
    .then(res => lamdaToSqs())
    .then(() => {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Your function executed successfully!',
        })
      };
    })
    .catch(err => new Error(`Error scraping: ${JSON.stringify(err)}`))
};

//This Lambda function will be triggered by SQS message, then get the JSON file in S3, convert it to CSV file, then connect to RDS MySQL and populate a table
module.exports.populate = async (event, context) => {
  jsonToCsv()
    .then(res =>s3ToMysql(res))
    .then(() => {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Your function executed successfully!',
        })
      };
    })
    .catch(err => new Error(`Error scraping: ${JSON.stringify(err)}`))
};

