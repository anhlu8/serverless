'use strict';
const {
  getFile,
  sqsToLambda,
  lamdaToSqs,
  saveToS3,
  getFromS3,
  unzipAndParse
} = require('./src');

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