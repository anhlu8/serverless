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
    .then(response => response.buffer())
    .then(response => saveToS3(response))
    .then(response => getFromS3(response))
    .then(response => unzipAndParse(response))
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